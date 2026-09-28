"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Check, Link2, Share2 } from "lucide-react";

export interface ShareButtonProps {
  /** Page title offered to the OS share sheet. */
  title: string;
  /** Short description offered to the OS share sheet. */
  text?: string;
  /**
   * Absolute or root-relative URL to share. When omitted the current
   * `window.location.href` is used, which is the right answer for a page-level
   * share control and keeps the component usable under static export where the
   * deployed origin is not known at build time.
   */
  url?: string;
  /** Extra classes for the trigger. */
  className?: string;
}

type ShareState = "idle" | "shared" | "copied" | "error";

/** How long the confirmation label stays up, in ms. */
const CONFIRM_MS = 2200;

/**
 * Capability detection for `navigator.share`, modelled as an external store.
 *
 * `navigator` does not exist during server rendering, so branching on it in the
 * render body would emit markup that disagrees with the client and trip a
 * hydration mismatch. `useSyncExternalStore` is the sanctioned way out: React
 * uses {@link getShareServerSnapshot} on the server and through hydration, then
 * re-reads {@link getShareSnapshot} on the client, so the first paint always
 * matches the HTML and the label settles without a `setState` inside an effect.
 *
 * The subscribe function is intentionally inert — support for the Web Share API
 * cannot change over a page's lifetime, so there is nothing to subscribe to.
 */
const subscribeToNothing = () => () => {};

const getShareSnapshot = () =>
  typeof navigator !== "undefined" && "share" in navigator;

const getShareServerSnapshot = () => false;

/**
 * ShareButton — one control, two behaviours.
 *
 * Where the Web Share API exists (iOS/Android, Safari, Edge) the native share
 * sheet opens, so the user gets Messages/Mail/AirDrop and every installed app
 * for free. Everywhere else — most desktop Chrome and Firefox — it falls back
 * to copying the URL to the clipboard and says so.
 *
 * The rendered label follows that split, and is resolved through
 * {@link getShareSnapshot} so server and client agree on the first paint.
 */
export function ShareButton({
  title,
  text,
  url,
  className = "",
}: ShareButtonProps) {
  const canWebShare = useSyncExternalStore(
    subscribeToNothing,
    getShareSnapshot,
    getShareServerSnapshot,
  );
  const [state, setState] = useState<ShareState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const flash = useCallback((next: ShareState) => {
    setState(next);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setState("idle"), CONFIRM_MS);
  }, []);

  const handleClick = useCallback(async () => {
    const shareUrl =
      url ?? (typeof window !== "undefined" ? window.location.href : "");

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        flash("shared");
        return;
      } catch (error) {
        // A user dismissing the sheet rejects with AbortError. That is not a
        // failure and must not surface an error state.
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        // Anything else (e.g. share() rejected by the platform) falls through
        // to the clipboard path below rather than dead-ending.
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      flash("copied");
    } catch {
      flash("error");
    }
  }, [flash, text, title, url]);

  const label =
    state === "copied"
      ? "Link copied"
      : state === "shared"
        ? "Shared"
        : state === "error"
          ? "Copy failed"
          : canWebShare
            ? "Share"
            : "Copy link";

  const Icon =
    state === "copied" || state === "shared"
      ? Check
      : canWebShare
        ? Share2
        : Link2;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 h-9 px-4 rounded-full border border-usds-steel-300 bg-white text-[13px] font-medium text-usds-steel-900 hover:border-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue ${className}`}
      >
        <Icon className="w-4 h-4" aria-hidden />
        {label}
      </button>

      {/*
        The label above changes in place, but a screen-reader user who has
        already moved focus on would not hear it. Announce the outcome.
      */}
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied"
          ? "Link copied to clipboard"
          : state === "error"
            ? "Could not copy the link"
            : ""}
      </span>
    </>
  );
}
