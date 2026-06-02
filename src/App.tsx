import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { getScene } from "./data/story";
import { init, reducer } from "./state/reducer";
import { Choice, StatKey } from "./types/game";
import { clearSave, loadGame, saveGame } from "./utils/storage";
import { playClick } from "./utils/sound";
import { trackEvent, trackSession } from "./utils/usage";
import { EmberBackground } from "./components/EmberBackground";
import { TitleScreen } from "./components/TitleScreen";
import { Prologue } from "./components/Prologue";
import { TopBar } from "./components/TopBar";
import { SceneView } from "./components/SceneView";
import { StatsPanel } from "./components/StatsPanel";
import { StatsSheet } from "./components/StatsSheet";
import { InventoryDrawer } from "./components/InventoryDrawer";
import { SaveControls } from "./components/SaveControls";
import { EndingCard } from "./components/EndingCard";

type Screen = "title" | "prologue" | "play";

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const [screen, setScreen] = useState<Screen>("title");
  // Where the prologue hands off when finished/skipped: "play" when it precedes
  // a new game, "title" when it's being replayed from the title screen.
  const [afterPrologue, setAfterPrologue] = useState<Screen>("play");
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsFocused, setStatsFocused] = useState<StatKey | null>(null);

  const scene = useMemo(() => getScene(state.currentSceneId), [state.currentSceneId]);

  // Auto-save on every state change after the first render.
  useEffect(() => {
    saveGame(state);
  }, [state]);

  // Anonymous usage telemetry (see utils/usage.ts). One session_start per load.
  useEffect(() => {
    trackSession();
  }, []);

  // Log reaching an ending (label = ending id) and entering the optional detour.
  // Fires once per scene change since `scene` is memoised on the scene id.
  useEffect(() => {
    if (scene.isEnding && scene.endingId) {
      trackEvent("ending", scene.endingId);
    } else if (scene.id === "drive_hub") {
      trackEvent("detour");
    }
  }, [scene]);

  const onChoose = useCallback(
    (choice: Choice) => {
      playClick(state.soundOn);
      // "Roll credits" on an ending isn't a normal branch — it ends the run.
      // Reset to a fresh game and return to the title (endings/toggles persist).
      if (scene.isEnding) {
        dispatch({ type: "new" });
        setScreen("title");
        return;
      }
      dispatch({ type: "choose", choice });
      setInventoryOpen(false);
      setStatsOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [state.soundOn, scene.isEnding],
  );

  const onNewGame = useCallback(() => {
    playClick(state.soundOn);
    trackEvent("new_game");
    dispatch({ type: "new" });
    // First time through, the (skippable) prologue plays before the first scene
    // and fires its own "prologue" beacon. Once seen/skipped, later new games go
    // straight to play — the title's "▸ Prologue" still replays it on demand.
    setAfterPrologue("play");
    setScreen(state.seenPrologue ? "play" : "prologue");
  }, [state.soundOn, state.seenPrologue]);

  const onReplayPrologue = useCallback(() => {
    playClick(state.soundOn);
    setAfterPrologue("title");
    setScreen("prologue");
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
      dispatch({ type: "set-pref", key, value: next });
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
          onReplayPrologue={onReplayPrologue}
        />
      ) : screen === "prologue" ? (
        <Prologue
          soundOn={state.soundOn}
          finishLabel={afterPrologue === "play" ? "Begin" : "Done"}
          onComplete={() => {
            dispatch({ type: "set-pref", key: "seenPrologue", value: true });
            setScreen(afterPrologue);
          }}
          onSkip={() => {
            dispatch({ type: "set-pref", key: "seenPrologue", value: true });
            setScreen(afterPrologue);
          }}
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
