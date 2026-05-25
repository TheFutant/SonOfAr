import {
  STAT_CODES,
  STAT_LABELS,
  STAT_ORDER,
  STAT_TINTS,
  Stats,
  StatKey,
  formatStat,
} from "../types/game";

interface Props {
  stats: Stats;
  /**
   * Called when the user taps a pill. Passes the tapped stat so the parent
   * can open a details sheet focused on it.
   */
  onOpenDetails?: (focused?: StatKey) => void;
}

export function StatsPanel({ stats, onOpenDetails }: Props) {
  return (
    <div className="grid grid-cols-5 gap-1.5" role="group" aria-label="Stats">
      {STAT_ORDER.map((k) => {
        const v = stats[k];
        return (
          <button
            key={k}
            type="button"
            onClick={() => onOpenDetails?.(k)}
            title={`${STAT_LABELS[k]} — tap for details`}
            aria-label={`${STAT_LABELS[k]}: ${formatStat(v)}. Tap to see all stats.`}
            className={[
              "choice-press rounded-lg border border-ash-600/60 bg-ash-800/70",
              "py-1.5 px-1.5 transition-colors min-h-[2.25rem]",
              "active:bg-ash-700/70 hover:border-ember-600/60",
              "flex items-center justify-center gap-1.5",
            ].join(" ")}
          >
            <span
              className={[
                "text-[11px] font-semibold tracking-[0.18em]",
                STAT_TINTS[k],
              ].join(" ")}
            >
              {STAT_CODES[k]}
            </span>
            <span className="text-base font-semibold text-ash-50 tabular-nums leading-none">
              {formatStat(v)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
