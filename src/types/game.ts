export type StatKey =
  | "heat"
  | "humanity"
  | "evidence"
  | "chaos"
  | "editorApproval";

export type Stats = Record<StatKey, number>;

export type CodeKey =
  | "never_start"
  | "never_burn_home"
  | "never_without_proof"
  | "never_paperwork";

export type EndingId =
  | "myth_of_ar"
  | "two_of_them"
  | "public_servant_of_fire"
  | "carl_wins";

export interface SceneEffect {
  stats?: Partial<Stats>;
  addItems?: string[];
  removeItems?: string[];
  setCode?: CodeKey;
  unlockEnding?: EndingId;
  setFlag?: { key: string; value: boolean };
}

export interface Condition {
  hasItems?: string[];
  notHasItems?: string[];
  minStats?: Partial<Stats>;
  maxStats?: Partial<Stats>;
  chosenCode?: CodeKey;
  flag?: { key: string; value: boolean };
}

export interface Choice {
  id: string;
  label: string;
  next: string;
  effects?: SceneEffect;
  requires?: Condition;
  /** Soft tag for flavor — e.g. "bad joke", "Oxford comma", "Editor's pick" */
  tag?: string;
  /** If true and `requires` is unmet, choice is shown but disabled (greyed) instead of hidden. */
  showIfLocked?: boolean;
}

export interface Scene {
  id: string;
  title: string;
  chapter: string;
  body: string;
  editorNote?: string;
  writersRoomNote?: string;
  onEnter?: SceneEffect;
  choices: Choice[];
  isEnding?: boolean;
  endingId?: EndingId;
}

export interface GameState {
  currentSceneId: string;
  stats: Stats;
  inventory: string[];
  chosenCode: CodeKey | null;
  history: string[];
  flags: Record<string, boolean>;
  completedEndings: EndingId[];
  chaosMode: boolean;
  writersRoomMode: boolean;
  soundOn: boolean;
}

export const DEFAULT_STATS: Stats = {
  heat: 0,
  humanity: 0,
  evidence: 0,
  chaos: 0,
  editorApproval: 0,
};

export const STAT_LABELS: Record<StatKey, string> = {
  heat: "Heat",
  humanity: "Humanity",
  evidence: "Evidence",
  chaos: "Chaos",
  editorApproval: "Editor",
};

export const STAT_TINTS: Record<StatKey, string> = {
  heat: "text-ember-500",
  humanity: "text-emerald-300",
  evidence: "text-sky-300",
  chaos: "text-fuchsia-300",
  editorApproval: "text-amber-200",
};

export const STAT_CODES: Record<StatKey, string> = {
  heat: "HT",
  humanity: "HU",
  evidence: "EV",
  chaos: "CH",
  editorApproval: "ED",
};

export const STAT_DESCRIPTIONS: Record<StatKey, string> = {
  heat:
    "Destructive force, building. Rises when you intimidate, borrow heat from suspiciously flammable trash cans, or stand near things that are about to ignite.",
  humanity:
    "Empathy and restraint. Rises when you protect, decline to escalate, and treat people as people — including, especially, Maebie.",
  evidence:
    "Truth, uncovered. Rises when you read the file, check the comma, and follow the thing that didn't add up.",
  chaos:
    "Absurdity and collateral weirdness. Rises with bad jokes, unaccounted-for fires, and Carl-shaped misunderstandings.",
  editorApproval:
    "Whether the Editor thinks the story is coherent and properly punctuated. Rises with serial commas, brand consistency, and tasteful kerning. Falls when you sign a list of three.",
};

export const CODE_LABELS: Record<CodeKey, string> = {
  never_start: "Never start the fire.",
  never_burn_home: "Never burn a home with people inside.",
  never_without_proof: "Never punish without proof.",
  never_paperwork: "Never let garbage hide behind paperwork.",
};

export const ENDING_TITLES: Record<EndingId, string> = {
  myth_of_ar: "The Myth of Ar",
  two_of_them: "The Two of Them",
  public_servant_of_fire: "Public Servant of Fire",
  carl_wins: "Carl from Insurance Wins",
};
