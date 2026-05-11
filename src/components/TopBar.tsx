interface Props {
  chapter: string;
  onTitle: () => void;
  onOpenInventory: () => void;
  inventoryCount: number;
}

export function TopBar({ chapter, onTitle, onOpenInventory, inventoryCount }: Props) {
  return (
    <div className="sticky top-0 z-20 -mx-4 px-4 py-2 backdrop-blur bg-ash-950/70 border-b border-ash-700/60">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onTitle}
          aria-label="Back to title"
          className="text-ash-200 hover:text-ash-50 text-sm px-2 py-1"
        >
          ←
        </button>
        <div className="flex-1 text-center truncate">
          <div className="text-[10px] uppercase tracking-[0.24em] text-ember-500/90">
            Chapter
          </div>
          <div className="text-sm text-ash-100 truncate">{chapter}</div>
        </div>
        <button
          onClick={onOpenInventory}
          className="relative rounded-lg border border-ash-600/70 bg-ash-800/70 px-3 py-1.5 text-sm text-ash-100"
        >
          Pockets
          {inventoryCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ember-700/70 px-1 text-xs text-ash-50">
              {inventoryCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
