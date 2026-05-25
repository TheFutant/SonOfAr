import { ITEM_FLAVOR, ITEM_LABELS, type ItemId } from "../data/items";
import { CODE_LABELS, CodeKey } from "../types/game";
import { BottomSheet } from "./BottomSheet";

interface Props {
  open: boolean;
  onClose: () => void;
  inventory: string[];
  chosenCode: CodeKey | null;
}

export function InventoryDrawer({ open, onClose, inventory, chosenCode }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Inventory">
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
    </BottomSheet>
  );
}
