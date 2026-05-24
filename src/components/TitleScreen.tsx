import { useState } from "react";
import { ENDING_TITLES, EndingId } from "../types/game";

interface Props {
  hasSave: boolean;
  completedEndings: EndingId[];
  onNewGame: () => void;
  onContinue: () => void;
}

const ALL_ENDINGS = Object.keys(ENDING_TITLES) as EndingId[];

export function TitleScreen({
  hasSave,
  completedEndings,
  onNewGame,
  onContinue,
}: Props) {
  const [confirmingNew, setConfirmingNew] = useState(false);
  return (
    <div className="relative z-10 mx-auto max-w-xl px-5 pt-safe pb-safe min-h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
        <p className="text-[11px] uppercase tracking-[0.4em] text-ember-500/90">
          a text adventure
        </p>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl text-ash-50 animate-flicker">
          Son of Ar
        </h1>
        <p className="mt-4 font-display italic text-ash-200/90">
          Legacy is written in ash. <br />
          Blood remembers, destiny endures.
        </p>
        <p className="mt-2 text-sm text-ash-300/80 italic">
          edited (loudly) by the Editor
        </p>

        <div className="mt-10 w-full space-y-3">
          {hasSave && (
            <div className="space-y-1">
              <button
                onClick={onContinue}
                className="choice-press w-full rounded-xl bg-ember-700/40 border border-ember-600/70 px-5 py-4 text-ash-50 text-lg hover:bg-ember-700/55"
              >
                Continue
              </button>
              <p className="text-xs italic text-ash-300/80 text-center">
                Picks up where you left off — new chapters wait past Ash Wake.
              </p>
            </div>
          )}
          <div className="space-y-1">
            {!hasSave ? (
              <button
                onClick={onNewGame}
                className="choice-press w-full rounded-xl border border-ash-500/70 bg-ash-800/70 px-5 py-4 text-ash-50 text-lg hover:border-ember-500/70"
              >
                Begin
              </button>
            ) : !confirmingNew ? (
              <>
                <button
                  onClick={() => setConfirmingNew(true)}
                  className="choice-press w-full rounded-xl border border-ash-500/70 bg-ash-800/70 px-5 py-4 text-ash-50 text-lg hover:border-ember-500/70"
                >
                  Start over
                </button>
                <p className="text-xs italic text-ash-300/80 text-center">
                  Resets the story. Discovered endings stay unlocked.
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setConfirmingNew(false);
                    onNewGame();
                  }}
                  className="choice-press w-full rounded-xl border border-red-400/50 bg-red-500/15 px-5 py-4 text-red-100 text-lg"
                >
                  Confirm start over
                </button>
                <button
                  onClick={() => setConfirmingNew(false)}
                  className="choice-press w-full rounded-xl border border-ash-500/70 px-5 py-3 text-ash-200"
                >
                  Cancel
                </button>
                <p className="text-xs italic text-ash-300/80 text-center">
                  This wipes your current run. Discovered endings stay unlocked.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 w-full">
          <div className="text-[11px] uppercase tracking-[0.22em] text-ash-300/80">
            Endings discovered
          </div>
          <ul className="mt-2 space-y-1 text-sm">
            {ALL_ENDINGS.map((e) => {
              const done = completedEndings.includes(e);
              return (
                <li
                  key={e}
                  className={[
                    "flex items-center justify-between border-b border-ash-700/70 py-1",
                    done ? "text-ash-50" : "text-ash-400 italic",
                  ].join(" ")}
                >
                  <span>{done ? ENDING_TITLES[e] : "— ???"}</span>
                  <span className="text-xs">{done ? "✓" : ""}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <footer className="text-center text-xs text-ash-400/80 py-4 italic">
        He never starts the fire. He only uses what is already there.
      </footer>
    </div>
  );
}
