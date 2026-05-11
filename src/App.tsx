import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { getScene } from "./data/story";
import { init, reducer } from "./state/reducer";
import { Choice, StatKey } from "./types/game";
import { clearSave, loadGame, saveGame } from "./utils/storage";
import { playClick } from "./utils/sound";
import { EmberBackground } from "./components/EmberBackground";
import { TitleScreen } from "./components/TitleScreen";
import { TopBar } from "./components/TopBar";
import { SceneView } from "./components/SceneView";
import { StatsPanel } from "./components/StatsPanel";
import { StatsSheet } from "./components/StatsSheet";
import { InventoryDrawer } from "./components/InventoryDrawer";
import { SaveControls } from "./components/SaveControls";
import { EndingCard } from "./components/EndingCard";

type Screen = "title" | "play";

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const [screen, setScreen] = useState<Screen>("title");
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsFocused, setStatsFocused] = useState<StatKey | null>(null);

  const scene = useMemo(() => getScene(state.currentSceneId), [state.currentSceneId]);

  // Auto-save on every state change after the first render.
  useEffect(() => {
    saveGame(state);
  }, [state]);

  const onChoose = useCallback(
    (choice: Choice) => {
      playClick(state.soundOn);
      dispatch({ type: "choose", choice });
      setInventoryOpen(false);
      setStatsOpen(false);
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
            onOpenInventory={() => {
              setStatsOpen(false);
              setInventoryOpen(true);
            }}
            inventoryCount={state.inventory.length}
          />

          <div className="mt-3">
            <StatsPanel
              stats={state.stats}
              onOpenDetails={(k) => {
                playClick(state.soundOn);
                setInventoryOpen(false);
                setStatsFocused(k ?? null);
                setStatsOpen(true);
              }}
            />
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

      <StatsSheet
        open={statsOpen}
        onClose={() => setStatsOpen(false)}
        stats={state.stats}
        focused={statsFocused}
      />
    </div>
  );
}
