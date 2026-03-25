import { Character, LineActor, LineItem } from "./canvasType";

export interface ProjectInfo {
  projectName: string;
  width: number;
  height: number;
  resourcePath: string;
}

export type Lang = "ko" | "en";

export const SUPPORTED_LANGUAGES: { code: Lang; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
];

export const TOOLS = {
  PROJECT: "Project",
  SCRIPTOR: "Scriptor",
  CHARACTER: "Character",
  STRUCTURE: "Scrip Structure"
} as const;

export type ToolType = typeof TOOLS[keyof typeof TOOLS];

export interface AppState {
  // ===== Project State =====
  projectInfo: ProjectInfo;

  // ===== App State =====
  lang: Lang;
  darkMode: boolean;
  activeTool: ToolType;

  // ===== Logic State =====
  images: { id: number; url: string }[];
  lineItems: LineItem[];
  selectedIndex: number;

  // ===== Character State =====
  characterList: Character[];
  selectedCharacter: Character | null;

  // ===== Actions =====
  setProjectInfo: (info: Partial<ProjectInfo>) => void;
  setLang: (lang: Lang) => void;
  toggleDarkMode: () => void;
  setActiveTool: (tool: ToolType) => void;

  // Scriptor Actions
  addLineItem: () => void;
  removeLineItem: (idx: number) => void;
  setSelectedIndex: (idx: number) => void;
  updateLineText: (lineId: string, actorId: string, newText: string) => void;
  updateLineActors: (lineId: string, actors: LineActor[]) => void;
  updateCharacterList: (newCharacters: Character[]) => void;

  // Character Actions
  setSelectedCharacter: (char: Character | null) => void;
  updateSelectedCharacter: (updated: Character) => void;
  addCharacter: () => void;
  addCharacterImage: (file: File) => void;
  addCharacterImageList: (files: File[]) => void;
  removeImageFromCharacter: (index: number) => void;
  changeCharacterThumbnail: (index: number) => void;
  initDefaultCharacterImages: () => Promise<void>;

  // Reset Actions
  resetAll: () => void;
}