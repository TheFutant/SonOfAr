import { ReactNode, useEffect } from "react";
import { cx } from "../utils/cx";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Heading shown in the sheet; also the default accessible label. */
  title: string;
  /** Overrides the accessible label if it should differ from the visible title. */
  ariaLabel?: string;
  children: ReactNode;
}

/**
 * Mobile-style bottom sheet: dimmed backdrop + slide-up panel with a drag handle
 * and a Close header. Shared by StatsSheet and InventoryDrawer. Owns the
 * Escape-to-close behavior; consumers supply only the body.
 */
export function BottomSheet({ open, onClose, title, ariaLabel, children }: Props) {
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
        className={cx(
          "fixed inset-0 z-30 bg-black/60 transition-opacity duration-200",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        role="dialog"
        aria-label={ariaLabel ?? title}
        className={cx(
          "fixed left-0 right-0 bottom-0 z-40 max-h-[80vh]",
          "rounded-t-2xl border-t border-ash-500/70 bg-ash-900/95 backdrop-blur",
          "transition-transform duration-300 will-change-transform pb-safe",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="px-4 pt-3">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-ash-500/70" />
        </div>
        <div className="px-5 pt-2 pb-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl text-ash-50">{title}</h2>
            <button
              onClick={onClose}
              className="text-sm text-ash-300 hover:text-ash-100 px-3 py-1"
            >
              Close
            </button>
          </div>
          {children}
        </div>
      </aside>
    </>
  );
}
