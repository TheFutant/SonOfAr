import { useState } from "react";
import {
  ENDING_TITLES,
  EndingId,
  GameState,
  STAT_LABELS,
  StatKey,
  CODE_LABELS,
} from "../types/game";

interface Props {
  endingId: EndingId;
  state: GameState;
}

const STAT_ORDER: StatKey[] = [
  "heat",
  "humanity",
  "evidence",
  "chaos",
  "editorApproval",
];

export function EndingCard({ endingId, state }: Props) {
  const [copied, setCopied] = useState(false);

  const summary = buildSummary(endingId, state);

  async function copy() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summary);
      } else {
        // Fallback — quietly skip if clipboard unavailable.
        return;
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op */
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-ember-600/50 bg-ash-900/80 p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-ember-500/90">
        Ending unlocked
      </div>
      <h2 className="mt-1 font-display text-2xl text-ash-50">
        {ENDING_TITLES[endingId]}
      </h2>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {STAT_ORDER.map((k) => (
          <div
            key={k}
            className="flex items-center justify-between rounded-lg border border-ash-700/70 bg-ash-800/60 px-3 py-1.5"
          >
            <dt className="text-ash-300/90">{STAT_LABELS[k]}</dt>
            <dd className="tabular-nums text-ash-50 font-semibold">
              {state.stats[k] > 0 ? `+${state.stats[k]}` : state.stats[k]}
            </dd>
          </div>
        ))}
      </dl>

      {state.chosenCode && (
        <p className="mt-3 text-ash-100/90 italic">
          Your code: <span className="not-italic">{CODE_LABELS[state.chosenCode]}</span>
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={copy}
          className="rounded-lg border border-ember-600/60 bg-ember-700/30 px-3 py-2 text-sm text-ash-50 hover:bg-ember-700/50"
        >
          {copied ? "Copied." : "Copy ending summary"}
        </button>
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-xs text-ash-300/90">
          Preview the summary
        </summary>
        <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-ash-700/70 bg-ash-950/70 p-3 text-xs text-ash-200 leading-relaxed">
          {summary}
        </pre>
      </details>
    </section>
  );
}

function buildSummary(endingId: EndingId, state: GameState): string {
  const lines: string[] = [];
  lines.push(`Son of Ar — ${ENDING_TITLES[endingId]}`);
  lines.push("");
  if (state.chosenCode) {
    lines.push(`Code: ${CODE_LABELS[state.chosenCode]}`);
  }
  lines.push("Stats:");
  for (const k of STAT_ORDER) {
    const v = state.stats[k];
    lines.push(`  • ${STAT_LABELS[k]}: ${v > 0 ? "+" + v : v}`);
  }
  if (state.inventory.length) {
    lines.push("");
    lines.push(`Pocket lint: ${state.inventory.length} item(s).`);
  }
  if (state.completedEndings.length) {
    lines.push("");
    lines.push(
      `Endings unlocked: ${state.completedEndings
        .map((e) => ENDING_TITLES[e])
        .join(", ")}`,
    );
  }
  lines.push("");
  lines.push("Legacy is written in ash.");
  return lines.join("\n");
}
