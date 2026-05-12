import {
  Choice,
  Condition,
  DEFAULT_STATS,
  GameState,
  Scene,
  SceneEffect,
  Stats,
  StatKey,
} from "../types/game";

import { STARTING_SCENE_ID } from "../data/story";

export function newGame(): GameState {
  return {
    currentSceneId: STARTING_SCENE_ID,
    stats: { ...DEFAULT_STATS },
    inventory: [],
    chosenCode: null,
    history: [],
    flags: {},
    completedEndings: [],
    chaosMode: false,
    writersRoomMode: false,
    soundOn: false,
  };
}

export function applyEffect(state: GameState, effect?: SceneEffect): GameState {
  if (!effect) return state;
  let next: GameState = { ...state };

  if (effect.stats) {
    const stats: Stats = { ...next.stats };
    for (const k of Object.keys(effect.stats) as StatKey[]) {
      const delta = effect.stats[k] ?? 0;
      stats[k] = clamp(stats[k] + delta, -10, 20);
    }
    next.stats = stats;
  }

  if (effect.addItems?.length) {
    const set = new Set(next.inventory);
    for (const item of effect.addItems) set.add(item);
    next.inventory = [...set];
  }

  if (effect.removeItems?.length) {
    const remove = new Set(effect.removeItems);
    next.inventory = next.inventory.filter((i) => !remove.has(i));
  }

  if (effect.setCode) {
    next.chosenCode = effect.setCode;
  }

  if (effect.unlockEnding) {
    if (!next.completedEndings.includes(effect.unlockEnding)) {
      next.completedEndings = [...next.completedEndings, effect.unlockEnding];
    }
  }

  if (effect.setFlags?.length) {
    const flags = { ...next.flags };
    for (const f of effect.setFlags) flags[f.key] = f.value;
    next.flags = flags;
  }

  return next;
}

export function meetsCondition(state: GameState, cond?: Condition): boolean {
  if (!cond) return true;

  if (cond.hasItems?.some((i) => !state.inventory.includes(i))) return false;
  if (cond.notHasItems?.some((i) => state.inventory.includes(i))) return false;

  if (cond.minStats) {
    for (const k of Object.keys(cond.minStats) as StatKey[]) {
      if (state.stats[k] < (cond.minStats[k] ?? 0)) return false;
    }
  }
  if (cond.maxStats) {
    for (const k of Object.keys(cond.maxStats) as StatKey[]) {
      if (state.stats[k] > (cond.maxStats[k] ?? 0)) return false;
    }
  }

  if (cond.chosenCode && state.chosenCode !== cond.chosenCode) return false;

  if (cond.flag) {
    const cur = state.flags[cond.flag.key] ?? false;
    if (cur !== cond.flag.value) return false;
  }

  return true;
}

export function visibleChoices(state: GameState, scene: Scene): Choice[] {
  return scene.choices.filter((c) => {
    if (meetsCondition(state, c.requires)) return true;
    return !!c.showIfLocked;
  });
}

/** Apply on-enter effects when transitioning to a new scene. */
export function enterScene(state: GameState, scene: Scene): GameState {
  let next: GameState = {
    ...state,
    currentSceneId: scene.id,
    history: [...state.history, scene.id].slice(-200),
  };
  next = applyEffect(next, scene.onEnter);
  return next;
}

/** Apply a player's choice: effects then move to next scene's onEnter. */
export function chooseChoice(
  state: GameState,
  choice: Choice,
  getScene: (id: string) => Scene,
): GameState {
  let next = applyEffect(state, choice.effects);
  const target = getScene(choice.next);
  next = enterScene(next, target);
  return next;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
