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
  STRUCTURE: "Data Structure"
} as const;

export type ToolType = typeof TOOLS[keyof typeof TOOLS];

export interface Character {
  name: string;
  img: File[];
  selectedImageIndex: number;
}

export interface ScriptCharacter {
  character: Character;
  position: number;
  tone: number;
}

export interface Script {
  id: string;
  text: string;
  character: ScriptCharacter[];
}

export interface AppState {
  // ===== Project State =====
  projectInfo: ProjectInfo;
  
  // ===== App State =====
  lang: Lang;
  darkMode: boolean;
  activeTool: ToolType;

  // ===== Logic State =====
  images: { id: number; url: string }[];
  scriptItems: Script[];
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
  addScriptItem: () => void;
  removeScriptItem: (idx: number) => void;
  setSelectedIndex: (idx: number) => void;
  updateScriptText: (newText: string) => void;
  updateScriptorCharacter: (character: ScriptCharacter[]) => void;
  updateScriptCharacter: (newCharacters: Character[]) => void;

  // Character Actions
  setSelectedCharacter: (char: Character | null) => void;
  updateSelectedCharacter: (updated: Character) => void;
  addCharacter: () => void;
  addCharacterImage: (file: File) => void;
  removeImageFromCharacter: (index: number) => void;
  changeCharacterThumbnail: (index: number) => void;
  initDefaultCharacterImages: () => Promise<void>;

  // Reset Actions
  resetAll: () => void;
}