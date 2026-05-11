import { Stats, STAT_LABELS, STAT_TINTS, StatKey } from "../types/game";

interface Props {
  stats: Stats;
  compact?: boolean;
}

const ORDER: StatKey[] = ["heat", "humanity", "evidence", "chaos", "editorApproval"];

export function StatsPanel({ stats, compact }: Props) {
  return (
    <div
      className={[
        "grid gap-1.5",
        compact ? "grid-cols-5" : "grid-cols-2 sm:grid-cols-5",
      ].join(" ")}
    >
      {ORDER.map((k) => {
        const v = stats[k];
        return (
          <div
            key={k}
            className="rounded-lg bg-ash-800/70 border border-ash-600/50 px-2 py-1.5 text-center"
          >
            <div
              className={[
                "text-[10px] uppercase tracking-[0.18em]",
                STAT_TINTS[k],
              ].join(" ")}
            >
              {STAT_LABELS[k]}
            </div>
            <div className="text-base font-semibold text-ash-50 tabular-nums">
              {v > 0 ? `+${v}` : v}
            </div>
          </div>
        );
      })}
    </div>
  );
}
