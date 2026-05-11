import { useEffect, useState } from "react";
import { EDITOR_COMPLAINTS } from "../data/story";

interface Props {
  note?: string;
  writersRoomNote?: string;
  chaosMode: boolean;
  writersRoomMode: boolean;
  sceneId: string;
}

export function EditorNotes({
  note,
  writersRoomNote,
  chaosMode,
  writersRoomMode,
  sceneId,
}: Props) {
  const [open, setOpen] = useState(true);
  const [complaint, setComplaint] = useState<string | null>(null);

  useEffect(() => {
    if (!chaosMode) {
      setComplaint(null);
      return;
    }
    // Pick a deterministic-ish complaint per scene so the same scene shows the
    // same gripe across renders, but different scenes feel fresh.
    const seed = Math.abs(
      [...sceneId].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7),
    );
    setComplaint(EDITOR_COMPLAINTS[seed % EDITOR_COMPLAINTS.length]);
  }, [chaosMode, sceneId]);

  if (!note && !writersRoomNote && !complaint) return null;

  return (
    <section className="mt-5 rounded-xl border border-amber-300/25 bg-amber-300/5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-[11px] uppercase tracking-[0.22em] text-amber-200/90">
          Editor's Notes
        </span>
        <span className="text-amber-200/80 text-sm">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 animate-fadein">
          {note && (
            <p className="text-amber-100/90 italic leading-relaxed">
              {note}
            </p>
          )}
          {complaint && (
            <p className="text-fuchsia-200/90 leading-relaxed">
              <span className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-300/80 mr-2">
                Complaint
              </span>
              {complaint}
            </p>
          )}
          {writersRoomMode && writersRoomNote && (
            <p className="text-sky-200/90 leading-relaxed border-l-2 border-sky-300/40 pl-3">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-sky-300/80 mb-1">
                Writers' Room
              </span>
              {writersRoomNote}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
