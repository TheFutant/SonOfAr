import { useState } from "react";

interface Props {
  onSave: () => void;
  onReset: () => void;
  chaosMode: boolean;
  writersRoomMode: boolean;
  soundOn: boolean;
  onToggleChaos: () => void;
  onToggleWritersRoom: () => void;
  onToggleSound: () => void;
}

export function SaveControls({
  onSave,
  onReset,
  chaosMode,
  writersRoomMode,
  soundOn,
  onToggleChaos,
  onToggleWritersRoom,
  onToggleSound,
}: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="rounded-xl border border-ash-600/60 bg-ash-900/80 p-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onSave}
          className="rounded-lg bg-ember-700/40 hover:bg-ember-700/60 border border-ember-600/60 px-3 py-2 text-sm text-ash-50"
        >
          Save now
        </button>
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="rounded-lg border border-ash-500/70 px-3 py-2 text-sm text-ash-200 hover:text-ash-50"
          >
            Reset game
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setConfirming(false);
                onReset();
              }}
              className="rounded-lg border border-red-400/50 bg-red-500/15 px-3 py-2 text-sm text-red-200"
            >
              Confirm reset
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-ash-500/70 px-3 py-2 text-sm text-ash-200"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
        <Toggle label="Chaos Mode" hint="Editor turns sarcastic." on={chaosMode} onClick={onToggleChaos} />
        <Toggle label="Writers Room" hint="Show hidden notes." on={writersRoomMode} onClick={onToggleWritersRoom} />
        <Toggle label="Sound" hint="Tiny clicks & embers." on={soundOn} onClick={onToggleSound} />
      </div>
      <p className="text-xs text-ash-300/80 italic">
        Auto-save runs after every choice. The save lives in your browser, on this device.
      </p>
    </div>
  );
}

function Toggle({
  label,
  hint,
  on,
  onClick,
}: {
  label: string;
  hint: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={[
        "text-left rounded-lg border px-3 py-2 transition-colors",
        on
          ? "border-ember-500/70 bg-ember-700/20 text-ash-50"
          : "border-ash-600/60 bg-ash-800/60 text-ash-200",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">{label}</span>
        <span className="text-xs">{on ? "On" : "Off"}</span>
      </div>
      <div className="text-xs text-ash-300/90">{hint}</div>
    </button>
  );
}
