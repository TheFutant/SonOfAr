import { GameState, StatKey, Stats } from "../types/game";
import { clamp, newGame } from "./gameEngine";

const KEY = "son-of-ar.save.v1";

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GameState> | null;
    if (!parsed || typeof parsed !== "object") return null;
    // Merge with defaults so older saves still work as we add fields.
    const base = newGame();
    // Re-clamp stats on load so an out-of-range or hand-edited save renders
    // valid numbers immediately, not only after the next stat-touching choice.
    const stats: Stats = { ...base.stats };
    const savedStats: Partial<Stats> = parsed.stats ?? {};
    for (const k of Object.keys(stats) as StatKey[]) {
      stats[k] = clamp(savedStats[k] ?? stats[k], -10, 20);
    }
    return {
      ...base,
      ...parsed,
      stats,
      flags: { ...(parsed.flags ?? {}) },
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
      completedEndings: Array.isArray(parsed.completedEndings)
        ? parsed.completedEndings
        : [],
    };
  } catch {
    return null;
  }
}

export function saveGame(state: GameState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // private mode, quota, etc. — silently no-op.
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* no-op */
  }
}
