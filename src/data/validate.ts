import type { Scene } from "../types/game";
import { ITEMS, type ItemId } from "./items";

/**
 * Validates story content. Called at module load by story.ts so authoring bugs
 * surface immediately in dev and on the first prod load — not silently when a
 * player happens to walk down a broken path months later.
 */
export function validateStory(scenes: readonly Scene[], startingId: string): void {
  const errors: string[] = [];
  const ids = new Set(scenes.map((s) => s.id));
  const knownItems = new Set<string>(Object.values(ITEMS) as ItemId[]);

  // 1. Duplicate scene ids.
  const seen = new Set<string>();
  for (const s of scenes) {
    if (seen.has(s.id)) errors.push(`duplicate scene id: ${s.id}`);
    seen.add(s.id);
  }

  // 2. Choice.next references and item ids.
  for (const scene of scenes) {
    for (const choice of scene.choices) {
      if (!ids.has(choice.next)) {
        errors.push(`${scene.id} → choice "${choice.id}" points to unknown scene "${choice.next}"`);
      }
      for (const item of choice.effects?.addItems ?? []) {
        if (!knownItems.has(item)) errors.push(`${scene.id}/${choice.id}: addItems unknown item "${item}"`);
      }
      for (const item of choice.effects?.removeItems ?? []) {
        if (!knownItems.has(item)) errors.push(`${scene.id}/${choice.id}: removeItems unknown item "${item}"`);
      }
      for (const item of choice.requires?.hasItems ?? []) {
        if (!knownItems.has(item)) errors.push(`${scene.id}/${choice.id}: requires.hasItems unknown item "${item}"`);
      }
      for (const item of choice.requires?.notHasItems ?? []) {
        if (!knownItems.has(item)) errors.push(`${scene.id}/${choice.id}: requires.notHasItems unknown item "${item}"`);
      }
    }
    for (const item of scene.onEnter?.addItems ?? []) {
      if (!knownItems.has(item)) errors.push(`${scene.id} onEnter: addItems unknown item "${item}"`);
    }
    for (const item of scene.onEnter?.removeItems ?? []) {
      if (!knownItems.has(item)) errors.push(`${scene.id} onEnter: removeItems unknown item "${item}"`);
    }
  }

  // 3. Ending wiring. Every isEnding scene must declare endingId; onEnter.unlockEnding
  //    should match (otherwise the ending is unreachable in completedEndings).
  for (const scene of scenes) {
    if (scene.isEnding) {
      if (!scene.endingId) errors.push(`${scene.id} marked isEnding but missing endingId`);
      if (scene.endingId && scene.onEnter?.unlockEnding !== scene.endingId) {
        errors.push(`${scene.id} endingId "${scene.endingId}" does not match onEnter.unlockEnding`);
      }
    }
  }

  // 4. Reachability from the starting scene.
  if (!ids.has(startingId)) {
    errors.push(`STARTING_SCENE_ID "${startingId}" not present in scenes`);
  } else {
    const reachable = new Set<string>();
    const queue: string[] = [startingId];
    const byId = new Map(scenes.map((s) => [s.id, s] as const));
    while (queue.length) {
      const cur = queue.shift()!;
      if (reachable.has(cur)) continue;
      reachable.add(cur);
      const s = byId.get(cur);
      if (!s) continue;
      for (const c of s.choices) {
        if (ids.has(c.next) && !reachable.has(c.next)) queue.push(c.next);
      }
    }
    for (const s of scenes) {
      if (!reachable.has(s.id)) errors.push(`unreachable scene: ${s.id}`);
    }
  }

  if (errors.length) {
    throw new Error(`Story validation failed:\n  - ${errors.join("\n  - ")}`);
  }
}
