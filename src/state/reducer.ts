import { getScene, STARTING_SCENE_ID } from "../data/story";
import type { Choice, GameState } from "../types/game";
import { chooseChoice, enterScene, newGame } from "../utils/gameEngine";
import { loadGame } from "../utils/storage";

export type Action =
  | { type: "choose"; choice: Choice }
  | { type: "new" }
  | {
      // Toggles a UI preference (NOT a story flag — those live in GameState.flags).
      type: "set-pref";
      key: keyof Pick<GameState, "chaosMode" | "writersRoomMode" | "soundOn">;
      value: boolean;
    };

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "choose":
      return chooseChoice(state, action.choice, getScene);
    case "new": {
      // Preserve completed endings and toggles across resets.
      const fresh = enterScene(newGame(), getScene(STARTING_SCENE_ID));
      return {
        ...fresh,
        completedEndings: state.completedEndings,
        chaosMode: state.chaosMode,
        writersRoomMode: state.writersRoomMode,
        soundOn: state.soundOn,
      };
    }
    case "set-pref":
      return { ...state, [action.key]: action.value };
  }
}

export function init(): GameState {
  const saved = loadGame();
  return saved ?? newGame();
}
