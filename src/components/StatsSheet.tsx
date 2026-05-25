import { useEffect, useRef } from "react";
import {
  STAT_CODES,
  STAT_DESCRIPTIONS,
  STAT_LABELS,
  STAT_ORDER,
  STAT_TINTS,
  Stats,
  StatKey,
} from "../types/game";

interface Props {
  open: boolean;
  onClose: () => void;
  stats: Stats;
  focused?: StatKey | null;
}

export function StatsSheet({ open, onClose, stats, focused }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // When opened with a focused stat, scroll it into view.
  useEffect(() => {
    if (!open || !focused) return;
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-stat="${focused}"]`,
    );
    node?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [open, focused]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={[
          "fixed inset-0 z-30 bg-black/60 transition-opacity duration-200",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      <aside
        role="dialog"
        aria-label="Stats"
        className={[
          "fixed left-0 right-0 bottom-0 z-40 max-h-[80vh]",
          "rounded-t-2xl border-t border-ash-500/70 bg-ash-900/95 backdrop-blur",
          "transition-transform duration-300 will-change-transform pb-safe",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="px-4 pt-3">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-ash-500/70" />
        </div>
        <div className="px-5 pt-2 pb-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl text-ash-50">Stats</h2>
            <button
              onClick={onClose}
              className="text-sm text-ash-300 hover:text-ash-100 px-3 py-1"
            >
              Close
            </button>
          </div>

          <ul
            ref={listRef}
            className="mt-3 max-h-[60vh] overflow-y-auto story-scroll pr-1 space-y-2"
          >
            {STAT_ORDER.map((k) => {
              const v = stats[k];
              const sign = v > 0 ? "+" : "";
              const isFocused = focused === k;
              return (
                <li
                  key={k}
                  data-stat={k}
                  className={[
                    "rounded-lg border bg-ash-800/60 px-3 py-2.5 transition-colors",
                    isFocused
                      ? "border-ember-500/70 ring-1 ring-ember-500/30"
                      : "border-ash-600/60",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span
                        className={[
                          "text-xs font-semibold tracking-[0.22em]",
                          STAT_TINTS[k],
                        ].join(" ")}
                      >
                        {STAT_CODES[k]}
                      </span>
                      <span className="text-ash-50 font-semibold truncate">
                        {STAT_LABELS[k]}
                      </span>
                    </div>
                    <span className="text-ash-50 font-semibold tabular-nums shrink-0">
                      {sign}
                      {v}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-ash-200/90 leading-relaxed">
                    {STAT_DESCRIPTIONS[k]}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
