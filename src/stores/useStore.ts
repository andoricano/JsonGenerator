import { create } from 'zustand';
import { AppState, Character, Script, TOOLS } from './storeType';
import { nanoid } from 'nanoid';

// 초기값 설정
const defaultCharacter: Character[] = [
  { name: "User", img: [], selectedImageIndex: 0 },
  { name: "mascot", img: [], selectedImageIndex: 0 }
];

const defaultScript: Script = {
  id: nanoid(),
  text: "",
  character: [{ character: defaultCharacter[0], position: 0, tone: 1 }]
};

export const useStore = create<AppState>((set, get) => ({
  // ===== App State =====
  projectName: "I Love yo yoU",
  lang: "en",
  darkMode: false,
  activeTool: TOOLS.PROJECT,

  // ===== Logic State =====
  images: [],
  scriptItems: [{ ...defaultScript }],
  selectedIndex: 0,

  // ===== Character State =====
  characterList: defaultCharacter,
  selectedCharacter: defaultCharacter[0],

  // ===== Actions =====
  setProjectName: (name) => set({ projectName: name }),
  setLang: (lang) => set({ lang }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setActiveTool: (tool) => set({ activeTool: tool }),

  // Scriptor Actions
  addScriptItem: () => set((state) => {
    const newItem = { ...defaultScript, id: nanoid() };
    const newList = [...state.scriptItems, newItem];
    return {
      scriptItems: newList,
      selectedIndex: newList.length - 1
    };
  }),

  removeScriptItem: (idx) => set((state) => ({
    scriptItems: state.scriptItems.filter((_, i) => i !== idx),
    // 삭제 후 인덱스 보정
    selectedIndex: Math.max(0, state.selectedIndex >= idx ? state.selectedIndex - 1 : state.selectedIndex)
  })),

  setSelectedIndex: (idx) => set({ selectedIndex: idx }),

  updateScriptText: (newText) => set((state) => ({
    scriptItems: state.scriptItems.map((item, idx) =>
      idx === state.selectedIndex ? { ...item, text: newText } : item
    )
  })),

  updateScriptorCharacter: (character) => set((state) => ({
    scriptItems: state.scriptItems.map((item, idx) =>
      idx === state.selectedIndex ? { ...item, character } : item
    )
  })),

  updateScriptCharacter: (newCharacters) => set((state) => ({
    scriptItems: state.scriptItems.map(item => ({
      ...item,
      character: item.character.map(sc => {
        const found = newCharacters.find(nc => nc.name === sc.character.name);
        return found ? { ...sc, character: found } : sc;
      })
    }))
  })),

  // Character Actions
  setSelectedCharacter: (char) => set({ selectedCharacter: char }),

  updateSelectedCharacter: (updated) => set((state) => {
    const newList = state.characterList.map(c => 
      c.name === state.selectedCharacter?.name ? updated : c
    );
    return {
      characterList: newList,
      selectedCharacter: updated
    };
  }),

  addCharacter: () => {
    const newChar: Character = { name: "New Character", img: [], selectedImageIndex: 0 };
    set((state) => ({
      characterList: [...state.characterList, newChar],
      selectedCharacter: newChar
    }));
  },

  addCharacterImage: (file) => {
    const { selectedCharacter, updateSelectedCharacter } = get();
    if (!selectedCharacter) return;
    updateSelectedCharacter({
      ...selectedCharacter,
      img: [...selectedCharacter.img, file]
    });
  },

  removeImageFromCharacter: (index) => {
    const { selectedCharacter, updateSelectedCharacter } = get();
    if (!selectedCharacter) return;
    updateSelectedCharacter({
      ...selectedCharacter,
      img: selectedCharacter.img.filter((_, i) => i !== index),
      selectedImageIndex: 0
    });
  },

  changeCharacterThumbnail: (index) => {
    const { selectedCharacter, updateSelectedCharacter } = get();
    if (!selectedCharacter) return;
    updateSelectedCharacter({ ...selectedCharacter, selectedImageIndex: index });
  },

  initDefaultCharacterImages: async () => {
    
  },

  resetAll: () => set({
    projectName: "I Love yo yoU",
    lang: "en",
    darkMode: false,
    activeTool: "Scriptor",
    images: [],
    scriptItems: [{ ...defaultScript, id: nanoid() }],
    selectedIndex: 0,
    characterList: defaultCharacter,
    selectedCharacter: defaultCharacter[0]
  })
}));