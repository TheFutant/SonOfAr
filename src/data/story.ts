import type { Scene } from "../types/game";
import { chapter1 } from "./chapters/01-ash-wake";
import { chapter2 } from "./chapters/02-maebie";
import { chapter3 } from "./chapters/03-public-works";
import { chapter4 } from "./chapters/04-big-dons";
import { chapter5 } from "./chapters/05-carl";
import { chapter6 } from "./chapters/06-the-line";
import { chapter7 } from "./chapters/07-legacy";
import { validateStory } from "./validate";

const chapters = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
] as const;

export type SceneId = (typeof chapters)[number][number]["id"];

const scenes: readonly Scene[] = chapters.flat();
const sceneMap = new Map<string, Scene>(scenes.map((s) => [s.id, s]));

export const STARTING_SCENE_ID = "ash_wake_1" satisfies SceneId;

validateStory(scenes, STARTING_SCENE_ID);

export function getScene(id: SceneId | string): Scene {
  const s = sceneMap.get(id);
  if (!s) {
    // Soft fallback so a typo in a `next` doesn't brick the whole save.
    return {
      id,
      title: "Missing Page",
      chapter: "Errata",
      body: `The Editor cannot find scene "${id}". A page has, regrettably, been mislaid.`,
      editorNote:
        'When this happens in print, we set it in italics and pretend it was a stylistic choice.',
      choices: [
        {
          id: "back_to_start",
          label: "Begin again.",
          next: STARTING_SCENE_ID,
        },
      ],
    };
  }
  return s;
}
