import { useEffect, useRef } from "react";
import {
  STAT_CODES,
  STAT_DESCRIPTIONS,
  STAT_LABELS,
  STAT_ORDER,
  STAT_TINTS,
  Stats,
  StatKey,
  formatStat,
} from "../types/game";
import { cx } from "../utils/cx";
import { BottomSheet } from "./BottomSheet";

interface Props {
  open: boolean;
  onClose: () => void;
  stats: Stats;
  focused?: StatKey | null;
}

export function StatsSheet({ open, onClose, stats, focused }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  // When opened with a focused stat, scroll it into view.
  useEffect(() => {
    if (!open || !focused) return;
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-stat="${focused}"]`,
    );
    node?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [open, focused]);

  return (
    <BottomSheet open={open} onClose={onClose} title="Stats">
      <ul
        ref={listRef}
        className="mt-3 max-h-[60vh] overflow-y-auto story-scroll pr-1 space-y-2"
      >
        {STAT_ORDER.map((k) => {
          const v = stats[k];
          const isFocused = focused === k;
          return (
            <li
              key={k}
              data-stat={k}
              className={cx(
                "rounded-lg border bg-ash-800/60 px-3 py-2.5 transition-colors",
                isFocused
                  ? "border-ember-500/70 ring-1 ring-ember-500/30"
                  : "border-ash-600/60",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span
                    className={cx(
                      "text-xs font-semibold tracking-[0.22em]",
                      STAT_TINTS[k],
                    )}
                  >
                    {STAT_CODES[k]}
                  </span>
                  <span className="text-ash-50 font-semibold truncate">
                    {STAT_LABELS[k]}
                  </span>
                </div>
                <span className="text-ash-50 font-semibold tabular-nums shrink-0">
                  {formatStat(v)}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ash-200/90 leading-relaxed">
                {STAT_DESCRIPTIONS[k]}
              </p>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}
