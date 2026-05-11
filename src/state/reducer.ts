import { getScene, STARTING_SCENE_ID } from "../data/story";
import type { Choice, GameState } from "../types/game";
import { chooseChoice, enterScene, newGame } from "../utils/gameEngine";
import { loadGame } from "../utils/storage";

export type Action =
  | { type: "choose"; choice: Choice }
  | { type: "load"; state: GameState }
  | { type: "new" }
  | {
      type: "set-flag";
      key: keyof Pick<GameState, "chaosMode" | "writersRoomMode" | "soundOn">;
      value: boolean;
    };

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "choose":
      return chooseChoice(state, action.choice, getScene);
    case "load":
      return action.state;
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
    case "set-flag":
      return { ...state, [action.key]: action.value };
  }
}

export function init(): GameState {
  const saved = loadGame();
  return saved ?? newGame();
}
