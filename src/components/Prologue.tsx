import { useCallback, useEffect, useState } from "react";
import { PROLOGUE_PANELS } from "../data/prologue";
import { playClick } from "../utils/sound";
import { trackEvent } from "../utils/usage";
import { cx } from "../utils/cx";

interface Props {
  /** Called when the reader finishes the last panel ("Begin"). */
  onComplete: () => void;
  /** Called when the reader skips out early. */
  onSkip: () => void;
  soundOn: boolean;
  /** Verb on the final button — "Begin" into a new game, "Done" when replaying. */
  finishLabel?: string;
}

const ALIGN: Record<NonNullable<(typeof PROLOGUE_PANELS)[number]["align"]>, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

/**
 * Typographic "comic" cold-open. Pure type + CSS over the global EmberBackground
 * — no illustration assets (see src/data/prologue.ts for the AI-art seam). One
 * panel per beat; advance by tap/click, Next, or →/Enter/Space; ← steps back;
 * Esc/Skip leaves early.
 */
export function Prologue({ onComplete, onSkip, soundOn, finishLabel = "Begin" }: Props) {
  const [i, setI] = useState(0);
  const panel = PROLOGUE_PANELS[i];
  const isLast = i === PROLOGUE_PANELS.length - 1;

  // One "prologue" usage beacon per view (new game or replay). Whitelisted in
  // nginx.conf — keep both in sync or the QA telemetry-parity gate fails.
  useEffect(() => {
    trackEvent("prologue");
  }, []);

  const advance = useCallback(() => {
    playClick(soundOn);
    if (isLast) onComplete();
    else setI((n) => n + 1);
  }, [isLast, onComplete, soundOn]);

  const back = useCallback(() => {
    if (i === 0) return;
    playClick(soundOn);
    setI((n) => n - 1);
  }, [i, soundOn]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft") {
        back();
      } else if (e.key === "Escape") {
        onSkip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back, onSkip]);

  return (
    <div className="relative z-10 mx-auto flex min-h-full max-w-xl flex-col px-5 pt-safe pb-safe">
      {/* Top row: progress dots + skip */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-1.5" aria-hidden>
          {PROLOGUE_PANELS.map((p, idx) => (
            <span
              key={p.id}
              className={cx(
                "h-1.5 rounded-full transition-all duration-300",
                idx === i ? "w-5 bg-ember-500" : idx < i ? "w-1.5 bg-ember-700" : "w-1.5 bg-ash-600",
              )}
            />
          ))}
        </div>
        <button
          onClick={onSkip}
          className="choice-press text-xs uppercase tracking-[0.2em] text-ash-300/80 hover:text-ash-100"
        >
          Skip →
        </button>
      </div>

      {/* The panel — clicking anywhere in this region advances. */}
      <button
        onClick={advance}
        aria-label={isLast ? finishLabel : "Next panel"}
        className="group flex flex-1 cursor-pointer flex-col items-center justify-center py-6 focus:outline-none"
      >
        <div
          key={panel.id}
          className={cx(
            "flex w-full animate-fadein flex-col gap-4",
            ALIGN[panel.align ?? "center"],
          )}
        >
          <div className="text-[11px] uppercase tracking-[0.4em] text-ember-500/80">
            Prologue · {i + 1} / {PROLOGUE_PANELS.length}
          </div>

          {panel.art && (
            <img
              src={panel.art}
              alt={panel.alt ?? ""}
              className="w-full rounded-lg border border-ash-600/70 object-cover shadow-lg shadow-black/40"
            />
          )}

          {panel.shout && (
            <h2 className="font-display text-3xl leading-tight text-ash-50 drop-shadow-[0_0_14px_rgba(232,90,20,0.35)] sm:text-4xl">
              {panel.shout}
            </h2>
          )}

          <div
            className={cx(
              "max-w-md rounded-xl border border-ash-600/60 bg-ash-900/55 px-5 py-4 text-ash-100 shadow-lg shadow-black/40 backdrop-blur-sm",
              "whitespace-pre-line text-base leading-relaxed sm:text-lg",
            )}
          >
            {panel.caption}
            {panel.attribution && (
              <div className="mt-2 italic text-ash-300/90">{panel.attribution}</div>
            )}
          </div>
        </div>
      </button>

      {/* Bottom controls */}
      <div className="flex items-center justify-between gap-3 py-5">
        <button
          onClick={back}
          disabled={i === 0}
          className={cx(
            "choice-press rounded-lg border px-4 py-2.5 text-sm",
            i === 0
              ? "cursor-not-allowed border-ash-700/60 text-ash-500"
              : "border-ash-500/70 text-ash-200 hover:border-ember-500/60",
          )}
        >
          Back
        </button>
        <span className="text-xs italic text-ash-400/70">tap to continue</span>
        <button
          onClick={advance}
          className="choice-press rounded-lg border border-ember-600/70 bg-ember-700/40 px-5 py-2.5 text-ash-50 hover:bg-ember-700/55"
        >
          {isLast ? finishLabel : "Next"}
        </button>
      </div>
    </div>
  );
}
