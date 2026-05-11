import { useEffect } from "react";
import { ITEM_FLAVOR, ITEM_LABELS, type ItemId } from "../data/items";
import { CODE_LABELS, CodeKey } from "../types/game";

interface Props {
  open: boolean;
  onClose: () => void;
  inventory: string[];
  chosenCode: CodeKey | null;
}

export function InventoryDrawer({ open, onClose, inventory, chosenCode }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={[
          "fixed inset-0 z-30 bg-black/60 transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      <aside
        role="dialog"
        aria-label="Inventory"
        className={[
          "fixed left-0 right-0 bottom-0 z-40 max-h-[80vh]",
          "rounded-t-2xl border-t border-ash-500/70 bg-ash-900/95 backdrop-blur",
          "transition-transform duration-300 will-change-transform pb-safe",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-ash-500/70" />
        </div>
        <div className="px-5 pt-2 pb-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl text-ash-50">Inventory</h2>
            <button
              onClick={onClose}
              className="text-sm text-ash-300 hover:text-ash-100 px-3 py-1"
            >
              Close
            </button>
          </div>

          {chosenCode && (
            <div className="mt-3 rounded-lg border border-amber-300/30 bg-amber-300/5 px-3 py-2">
              <div className="text-[10px] uppercase tracking-[0.18em] text-amber-200/80">
                Your Code
              </div>
              <div className="text-ash-50 mt-0.5">{CODE_LABELS[chosenCode]}</div>
            </div>
          )}

          <div className="mt-3 max-h-[55vh] overflow-y-auto story-scroll pr-1">
            {inventory.length === 0 ? (
              <p className="text-ash-300 italic">
                Pockets empty. Not even lint, which is, frankly, unrealistic.
              </p>
            ) : (
              <ul className="space-y-2">
                {inventory.map((rawId) => {
                  const id = rawId as ItemId;
                  return (
                    <li
                      key={rawId}
                      className="rounded-lg border border-ash-600/60 bg-ash-800/60 px-3 py-2"
                    >
                      <div className="text-ash-50 font-semibold">
                        {ITEM_LABELS[id] ?? rawId}
                      </div>
                      {ITEM_FLAVOR[id] && (
                        <div className="mt-1 text-sm text-ash-200/90">
                          {ITEM_FLAVOR[id]}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
