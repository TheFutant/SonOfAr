import { Choice } from "../types/game";
import { cx } from "../utils/cx";

interface Props {
  choice: Choice;
  disabled?: boolean;
  onClick: (choice: Choice) => void;
}

const TAG_STYLE: Record<string, string> = {
  "bad joke": "text-fuchsia-300/80",
  "brand consistency": "text-amber-200/80",
  "Oxford comma": "text-amber-200/80",
};

export function ChoiceButton({ choice, disabled, onClick }: Props) {
  const tagColor = choice.tag ? TAG_STYLE[choice.tag] : undefined;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(choice)}
      className={cx(
        "choice-press w-full text-left rounded-xl px-4 py-3 sm:py-3.5",
        "border border-ash-500/60 bg-ash-800/70 backdrop-blur",
        "text-ash-50 text-base sm:text-lg leading-snug",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_24px_-12px_rgba(0,0,0,0.7)]",
        "transition-colors duration-150",
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:border-ember-600/70 active:border-ember-500/90 active:bg-ash-700/70",
        "min-h-[3.25rem]", // big tap target
      )}
    >
      <span className="block">{choice.label}</span>
      {choice.tag && (
        <span
          className={cx(
            "mt-1 inline-block text-xs uppercase tracking-[0.18em]",
            tagColor ?? "text-ash-300/80",
          )}
        >
          · {choice.tag}
        </span>
      )}
      {disabled && (
        <span className="mt-1 block text-xs text-ash-300/70 italic">
          Conditions not met — try a different path.
        </span>
      )}
    </button>
  );
}
