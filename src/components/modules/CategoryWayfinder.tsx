"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MoveRight, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { WayfinderConfig } from "@/lib/wayfinder-data";

interface ChipGroupProps {
  question: string;
  options: string[];
  onSelect: (index: number) => void;
}

function ChipGroup({ question, options, onSelect }: ChipGroupProps) {
  return (
    <div>
      <p
        className="font-garamond text-usds-steel-900 text-[28px] sm:text-[34px] lg:text-[38px] leading-snug mb-6"
        style={{ fontWeight: 474 }}
      >
        {question}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option, i) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(i)}
            className="rounded-full bg-white border border-usds-steel-300 text-gsa-navy font-geist text-[16px] font-medium px-5 py-2.5 hover:border-gsa-navy hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

interface SentenceFragment {
  text: string;
  /** When set, clicking the fragment reopens that step */
  onRevisit?: () => void;
}

function WayfinderSentence({ fragments }: { fragments: SentenceFragment[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <p
      className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-2 font-garamond text-usds-steel-900 text-[28px] sm:text-[34px] lg:text-[38px] leading-snug mb-6"
      style={{ fontWeight: 474 }}
    >
      <AnimatePresence initial={false}>
        {fragments.map((f) => (
          <motion.span
            key={f.text}
            layout
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {f.onRevisit ? (
              <button
                type="button"
                onClick={f.onRevisit}
                className="text-gsa-navy underline decoration-dotted decoration-usds-blue-400 underline-offset-[6px] hover:decoration-usds-blue-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
              >
                {f.text}
              </button>
            ) : (
              f.text
            )}
          </motion.span>
        ))}
      </AnimatePresence>
    </p>
  );
}

/**
 * CategoryWayfinder — conversational "I am … looking to …" flow. One question
 * at a time; answers accumulate into an editable sentence. Tapping an answered
 * fragment reopens that step. Fully deterministic — no free-text input.
 */
export function CategoryWayfinder({ config }: { config: WayfinderConfig }) {
  const [audienceIdx, setAudienceIdx] = useState<number | null>(null);
  const [intentIdx, setIntentIdx] = useState<number | null>(null);
  const [contextIdx, setContextIdx] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  // eslint-disable-next-line security/detect-object-injection -- audienceIdx is a bounded numeric state index set only from map() over config.audiences
  const audience = audienceIdx !== null ? config.audiences[audienceIdx] : null;
  const intent =
    audience && intentIdx !== null
      ? // eslint-disable-next-line security/detect-object-injection -- intentIdx is a bounded numeric state index set only from map() over audience.intents
        audience.intents[intentIdx]
      : null;
  const contexts = intent?.contexts ?? [];
  const needsContext = contexts.length > 0;
  const context =
    needsContext && contextIdx !== null
      ? // eslint-disable-next-line security/detect-object-injection -- contextIdx is a bounded numeric state index set only from map() over contexts
        contexts[contextIdx]
      : null;
  const complete = intent !== null && (!needsContext || context !== null);
  const href = complete ? (context ? context.href : (intent.href ?? "#")) : "#";

  const restartFromAudience = () => {
    setAudienceIdx(null);
    setIntentIdx(null);
    setContextIdx(null);
  };
  const restartFromIntent = () => {
    setIntentIdx(null);
    setContextIdx(null);
  };

  const fragments: SentenceFragment[] = [{ text: "I am" }];
  if (audience) {
    fragments.push({ text: audience.label, onRevisit: restartFromAudience });
    if (intent) {
      fragments.push({ text: "looking to" });
      fragments.push({ text: intent.label, onRevisit: restartFromIntent });
      if (context) {
        fragments.push({ text: intent.contextLead ?? "for" });
        fragments.push({
          text: context.label,
          onRevisit: () => setContextIdx(null),
        });
      }
      if (complete) fragments.push({ text: "." });
    }
  }

  const stepKey = complete
    ? "complete"
    : intent && needsContext
      ? "context"
      : audience
        ? "intent"
        : "audience";

  return (
    <section
      aria-labelledby="wayfinder-eyebrow"
      className="bg-usds-steel-100 border-b border-usds-steel-200"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
        <Reveal y={16}>
          <p
            id="wayfinder-eyebrow"
            className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-8"
          >
            Find your path
          </p>
        </Reveal>
        <Reveal y={20} delay={0.05}>
          <div aria-live="polite">
            {audience && <WayfinderSentence fragments={fragments} />}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={stepKey}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {!audience && (
                  <ChipGroup
                    question="Who are you?"
                    options={config.audiences.map((a) => a.label)}
                    onSelect={setAudienceIdx}
                  />
                )}
                {audience && !intent && (
                  <ChipGroup
                    question="What are you looking to do?"
                    options={audience.intents.map((i) => i.label)}
                    onSelect={setIntentIdx}
                  />
                )}
                {intent && needsContext && !context && (
                  <ChipGroup
                    question="What matters most?"
                    options={contexts.map((c) => c.label)}
                    onSelect={setContextIdx}
                  />
                )}
                {complete && (
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 rounded-full bg-gsa-navy text-white font-geist text-[16px] font-medium px-6 py-3 hover:bg-usds-steel-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue focus-visible:ring-offset-2"
                    >
                      Take me there
                      <MoveRight aria-hidden className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={restartFromAudience}
                      className="inline-flex items-center gap-2 font-geist text-[16px] font-medium text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
                    >
                      <RotateCcw aria-hidden className="h-3.5 w-3.5" />
                      Start over
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
