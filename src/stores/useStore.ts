import { create } from 'zustand';
import { AppState, TOOLS } from './storeType';
import { nanoid } from 'nanoid';
import { Character, LineItem } from './canvasType';

const defaultCharacter: Character[] = [
  {
    id: nanoid(),
    name: "User",
    img: [],
    previewUrls: [],
    thumbnail: 0,
    path: "",
    memo: "기본 생성되는 캐릭터 입니다. 수정해주세요."
  },
  {
    id: nanoid(),
    name: "mascot",
    img: [],
    previewUrls: [],
    thumbnail: 0,
    path: "",
    memo: "기본 생성되는 캐릭터 입니다. 수정해주세요."
  }
];

const createDefaultScript = (): LineItem => ({
  id: nanoid(),
  actors: [
    {
      id: nanoid(),
      characterId: defaultCharacter[0].id,
      characterImageIdx: 0,
      actorText: "",
      actorState: 0,
      actorEffect: ""
    }
  ],
  effect: ""
});

export const useStore = create<AppState>((set, get) => ({
  // ===== Initial State =====
  projectInfo: {
    projectName: 'New Project',
    width: 1920,
    height: 1080,
    resourcePath: './Resources/',
  },

  lang: "en",
  darkMode: false,
  activeTool: TOOLS.PROJECT,
  images: [],
  lineItems: [createDefaultScript()],
  selectedIndex: 0,
  characterList: defaultCharacter,
  selectedCharacter: defaultCharacter[0],

  // ===== Actions =====
  setProjectInfo: (info) => set((state) => ({
    projectInfo: { ...state.projectInfo, ...info }
  })),

  setLang: (lang) => set({ lang }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  setActiveTool: (tool) => set({ activeTool: tool }),

  // Scriptor Actions
  addLineItem: () => set((state) => {
    const newItem = createDefaultScript();
    const newList = [...state.lineItems, newItem];
    return {
      lineItems: newList,
      selectedIndex: newList.length - 1
    };
  }),

  removeLineItem: (idx) => set((state) => {
    const newList = state.lineItems.filter((_, i) => i !== idx);
    const nextIdx = Math.max(0, state.selectedIndex >= idx ? state.selectedIndex - 1 : state.selectedIndex);
    return {
      lineItems: newList.length > 0 ? newList : [createDefaultScript()],
      selectedIndex: newList.length > 0 ? nextIdx : 0
    };
  }),

  setSelectedIndex: (idx) => set({ selectedIndex: idx }),

  updateLineText: (lineId, actorId, newText) => set((state) => ({
    lineItems: state.lineItems.map((item) =>
      item.id === lineId
        ? {
          ...item,
          actors: item.actors.map(actor =>
            actor.id === actorId ? { ...actor, actorText: newText } : actor
          )
        }
        : item
    )
  })),

  updateLineActors: (lineId, actors) => set((state) => ({
    lineItems: state.lineItems.map((item) =>
      item.id === lineId ? { ...item, actors } : item
    )
  })),

  updateCharacterList: (newCharacters) => set({ characterList: newCharacters }),

  // Character Actions
  setSelectedCharacter: (char) => set({ selectedCharacter: char }),

  updateSelectedCharacter: (updated) => set((state) => {
    const newList = state.characterList.map(c =>
      c.id === state.selectedCharacter?.id ? updated : c
    );
    return {
      characterList: newList,
      selectedCharacter: updated
    };
  }),

  addCharacter: () => {
    const { characterList } = get();
    const newCount = characterList.length + 1;

    const newChar: Character = {
      id: nanoid(),
      name: `Character ${newCount}`,
      img: [],
      previewUrls: [],
      thumbnail: 0,
      memo: "",
      path: ""
    };

    set((state) => ({
      characterList: [...state.characterList, newChar],
      selectedCharacter: newChar
    }));
  },

  addCharacterImage: (file: File) => {
    const { selectedCharacter, updateSelectedCharacter } = get();
    if (!selectedCharacter) return;

    const newPreviewUrl = URL.createObjectURL(file);

    updateSelectedCharacter({
      ...selectedCharacter,
      img: [...selectedCharacter.img, file],
      previewUrls: [...(selectedCharacter.previewUrls || []), newPreviewUrl]
    });
  },

  removeImageFromCharacter: (index: number) => {
    const { selectedCharacter, updateSelectedCharacter } = get();
    if (!selectedCharacter) return;

    const targetUrl = selectedCharacter.previewUrls[index];
    if (targetUrl) URL.revokeObjectURL(targetUrl);

    updateSelectedCharacter({
      ...selectedCharacter,
      img: selectedCharacter.img.filter((_, i) => i !== index),
      previewUrls: selectedCharacter.previewUrls.filter((_, i) => i !== index),
      thumbnail: 0
    });
  },
  changeCharacterThumbnail: (index) => {
    const { selectedCharacter, updateSelectedCharacter } = get();
    if (!selectedCharacter) return;
    updateSelectedCharacter({ ...selectedCharacter, thumbnail: index });
  },

  initDefaultCharacterImages: async () => {

  },

  resetAll: () => set({
    projectInfo: { projectName: 'New Project', width: 1920, height: 1080, resourcePath: './Resources/' },
    lang: "en",
    darkMode: false,
    activeTool: TOOLS.PROJECT,
    images: [],
    lineItems: [createDefaultScript()],
    selectedIndex: 0,
    characterList: defaultCharacter,
    selectedCharacter: defaultCharacter[0]
  })
}));