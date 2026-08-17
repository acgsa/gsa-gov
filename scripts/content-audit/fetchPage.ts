/**
 * Static page fetcher + content extractor.
 *
 * Static HTML only (no headless browser). Pages that are JS-rendered, thin,
 * errored, gone, or redirected are flagged for manual review and are NOT
 * auto-deleted on missing content alone (ADR-006).
 */
import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { config } from "./config";
import { JsonCache, sleep } from "./cache";
import type { PageSignals, ReviewReason } from "./types";

const cache = new JsonCache(config.cacheDir);

const DOWNLOAD_EXT = /\.(pdf|docx?|xlsx?|pptx?|csv|zip)(\?|$)/i;
const CONTACT_RE =
  /\b[\w.+-]+@[\w-]+\.[\w.-]+\b|\(\d{3}\)\s*\d{3}-\d{4}|\b\d{3}-\d{3}-\d{4}\b/;

interface RawFetch {
  status: number | "error";
  finalUrl?: string;
  redirected: boolean;
  contentType?: string;
  html?: string;
}

async function rawFetch(url: string): Promise<RawFetch> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.fetchTimeoutMs);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "user-agent": config.userAgent,
        accept: "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    const contentType = res.headers.get("content-type") ?? undefined;
    const isHtml = contentType?.includes("text/html") ?? false;
    const html = isHtml ? await res.text() : undefined;
    return {
      status: res.status,
      finalUrl: res.url,
      redirected: res.redirected,
      contentType,
      html,
    };
  } catch {
    clearTimeout(timer);
    return { status: "error", redirected: false };
  }
}

/**
 * Heuristic: does the static HTML look like an empty JS shell (SPA)?
 * True when there is very little text but the page references app bundles /
 * root mount points.
 */
function looksJsRendered($: cheerio.CheerioAPI, textLen: number): boolean {
  if (textLen > 400) return false;
  const hasRoot = $("#root, #app, #__next, [data-reactroot]").length > 0;
  const scriptHeavy = $("script[src]").length >= 3;
  return hasRoot || scriptHeavy;
}

function extractReadable(
  html: string,
  url: string,
): { text: string; title?: string } {
  try {
    const dom = new JSDOM(html, { url });
    const article = new Readability(dom.window.document).parse();
    if (article?.textContent) {
      return {
        text: article.textContent.trim(),
        title: article.title ?? undefined,
      };
    }
  } catch {
    /* fall through to cheerio body text */
  }
  const $ = cheerio.load(html);
  $("script,style,noscript,nav,footer,header").remove();
  return { text: $("body").text().replace(/\s+/g, " ").trim() };
}

/** Fetch + extract a single page, with cache. */
export async function fetchAndExtract(
  normalizedUrl: string,
): Promise<PageSignals> {
  const cached = await cache.get<PageSignals>("page", normalizedUrl);
  if (cached) return cached;

  await sleep(config.perRequestDelayMs);
  const raw = await rawFetch(normalizedUrl);

  const reviewReasons: ReviewReason[] = [];
  const base: PageSignals = {
    fetchStatus: raw.status,
    finalUrl: raw.finalUrl,
    redirected: raw.redirected,
    contentType: raw.contentType,
    headings: [],
    bodyText: "",
    wordCount: 0,
    hasForm: false,
    hasDownload: false,
    hasContactInfo: false,
    ctaCount: 0,
    downloadLinks: [],
    needsManualReview: false,
    reviewReasons,
  };

  if (raw.status === "error") {
    reviewReasons.push("fetch-error");
    base.needsManualReview = true;
    await cache.set("page", normalizedUrl, base);
    return base;
  }
  if (raw.status === 404) reviewReasons.push("not-found-404");
  if (raw.status === 410) reviewReasons.push("gone-410");
  if (raw.redirected) reviewReasons.push("redirect");

  if (!raw.html) {
    base.needsManualReview = reviewReasons.length > 0;
    await cache.set("page", normalizedUrl, base);
    return base;
  }

  const $ = cheerio.load(raw.html);
  base.metaTitle = $("title").first().text().trim() || undefined;
  base.metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || undefined;
  base.canonical = $('link[rel="canonical"]').attr("href")?.trim() || undefined;
  base.headings = $("h1,h2,h3")
    .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
    .get()
    .filter(Boolean)
    .slice(0, 50);

  const { text, title } = extractReadable(
    raw.html,
    raw.finalUrl ?? normalizedUrl,
  );
  base.bodyText = text;
  base.wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
  if (!base.metaTitle && title) base.metaTitle = title;

  base.hasForm = $("form").length > 0;
  const downloadLinks = $("a[href]")
    .map((_, el) => $(el).attr("href") ?? "")
    .get()
    .filter((h) => DOWNLOAD_EXT.test(h));
  base.downloadLinks = Array.from(new Set(downloadLinks)).slice(0, 25);
  base.hasDownload = base.downloadLinks.length > 0;
  base.hasContactInfo = CONTACT_RE.test(`${text} ${raw.html}`);
  base.ctaCount = $(
    "a.button, a.btn, .usa-button, button, [role='button']",
  ).length;

  base.contentHash = createHash("sha256")
    .update(text.toLowerCase().replace(/\s+/g, " ").slice(0, 5000))
    .digest("hex");

  if (base.wordCount < config.thinContentWordThreshold) {
    reviewReasons.push(
      looksJsRendered($, text.length) ? "js-rendered" : "thin-content",
    );
  }
  base.needsManualReview = reviewReasons.length > 0;

  await cache.set("page", normalizedUrl, base);
  return base;
}
