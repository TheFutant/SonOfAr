import { Scene, GameState, Choice } from "../types/game";
import { ChoiceButton } from "./ChoiceButton";
import { EditorNotes } from "./EditorNotes";
import { meetsCondition, visibleChoices } from "../utils/gameEngine";

interface Props {
  scene: Scene;
  state: GameState;
  onChoose: (choice: Choice) => void;
}

export function SceneView({ scene, state, onChoose }: Props) {
  const visible = visibleChoices(state, scene);

  return (
    <article className="animate-fadein">
      <header className="mb-3">
        <div className="text-[11px] uppercase tracking-[0.22em] text-ember-500/90">
          {scene.chapter}
        </div>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl text-ash-50 leading-tight">
          {scene.title}
        </h1>
      </header>

      <div className="text-ash-100 text-[1.05rem] sm:text-lg leading-relaxed whitespace-pre-line">
        {scene.body}
      </div>

      <EditorNotes
        note={scene.editorNote}
        writersRoomNote={scene.writersRoomNote}
        chaosMode={state.chaosMode}
        writersRoomMode={state.writersRoomMode}
        sceneId={scene.id}
      />

      <div className="mt-6 space-y-2.5">
        {visible.map((c) => {
          const disabled = !meetsCondition(state, c.requires);
          return (
            <ChoiceButton
              key={c.id}
              choice={c}
              disabled={disabled}
              onClick={onChoose}
            />
          );
        })}
      </div>
    </article>
  );
}
