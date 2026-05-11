import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { getScene } from "./data/story";
import {
  Choice,
  GameState,
} from "./types/game";
import {
  STARTING_SCENE_ID,
  chooseChoice,
  enterScene,
  newGame,
} from "./utils/gameEngine";
import { clearSave, loadGame, saveGame } from "./utils/storage";
import { playClick } from "./utils/sound";
import { EmberBackground } from "./components/EmberBackground";
import { TitleScreen } from "./components/TitleScreen";
import { SceneView } from "./components/SceneView";
import { StatsPanel } from "./components/StatsPanel";
import { InventoryDrawer } from "./components/InventoryDrawer";
import { SaveControls } from "./components/SaveControls";
import { EndingCard } from "./components/EndingCard";

type Screen = "title" | "play";

type Action =
  | { type: "choose"; choice: Choice }
  | { type: "load"; state: GameState }
  | { type: "new" }
  | { type: "set-flag"; key: keyof Pick<GameState, "chaosMode" | "writersRoomMode" | "soundOn">; value: boolean };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "choose": {
      return chooseChoice(state, action.choice, getScene);
    }
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

function init(): GameState {
  const saved = loadGame();
  return saved ?? newGame();
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const [screen, setScreen] = useState<Screen>(() =>
    loadGame() ? "title" : "title",
  );
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const scene = useMemo(() => getScene(state.currentSceneId), [state.currentSceneId]);

  // Auto-save on every state change after the first render.
  useEffect(() => {
    saveGame(state);
  }, [state]);

  const onChoose = useCallback(
    (choice: Choice) => {
      playClick(state.soundOn);
      dispatch({ type: "choose", choice });
      // close inventory drawer if open
      setInventoryOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [state.soundOn],
  );

  const onNewGame = useCallback(() => {
    playClick(state.soundOn);
    dispatch({ type: "new" });
    setScreen("play");
  }, [state.soundOn]);

  const onContinue = useCallback(() => {
    playClick(state.soundOn);
    setScreen("play");
  }, [state.soundOn]);

  const onSave = useCallback(() => {
    playClick(state.soundOn);
    saveGame(state);
  }, [state]);

  const onReset = useCallback(() => {
    playClick(state.soundOn);
    clearSave();
    dispatch({ type: "new" });
    setScreen("title");
  }, [state.soundOn]);

  const onToggle = useCallback(
    (key: "chaosMode" | "writersRoomMode" | "soundOn") => {
      const next = !state[key];
      dispatch({ type: "set-flag", key, value: next });
      if (key === "soundOn" && next) playClick(true);
    },
    [state],
  );

  const onTitle = useCallback(() => {
    setScreen("title");
  }, []);

  return (
    <div className="relative min-h-full">
      <EmberBackground />

      {screen === "title" ? (
        <TitleScreen
          hasSave={!!loadGame()}
          completedEndings={state.completedEndings}
          onNewGame={onNewGame}
          onContinue={onContinue}
        />
      ) : (
        <div className="relative z-10 mx-auto max-w-2xl px-4 pt-safe pb-28">
          <TopBar
            chapter={scene.chapter}
            onTitle={onTitle}
            onOpenInventory={() => setInventoryOpen(true)}
            inventoryCount={state.inventory.length}
          />

          <div className="mt-3">
            <StatsPanel stats={state.stats} compact />
          </div>

          <main className="mt-5">
            <SceneView scene={scene} state={state} onChoose={onChoose} />

            {scene.isEnding && scene.endingId && (
              <EndingCard endingId={scene.endingId} state={state} />
            )}
          </main>

          <section className="mt-8">
            <SaveControls
              onSave={onSave}
              onReset={onReset}
              chaosMode={state.chaosMode}
              writersRoomMode={state.writersRoomMode}
              soundOn={state.soundOn}
              onToggleChaos={() => onToggle("chaosMode")}
              onToggleWritersRoom={() => onToggle("writersRoomMode")}
              onToggleSound={() => onToggle("soundOn")}
            />
          </section>
        </div>
      )}

      <InventoryDrawer
        open={inventoryOpen}
        onClose={() => setInventoryOpen(false)}
        inventory={state.inventory}
        chosenCode={state.chosenCode}
      />
    </div>
  );
}

function TopBar({
  chapter,
  onTitle,
  onOpenInventory,
  inventoryCount,
}: {
  chapter: string;
  onTitle: () => void;
  onOpenInventory: () => void;
  inventoryCount: number;
}) {
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
