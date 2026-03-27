import { create } from 'zustand';
import { AppState, TOOLS } from './storeType';
import { nanoid } from 'nanoid';
import { Character, LineItem } from './canvasType';

const DEFAULT_CHARACTERS: Character[] = [
  {
    id: "char_black",
    name: "Black",
    img: [],
    previewUrls: [],
    thumbnail: 0,
    path: "black",
    memo: "검정색 캐릭터입니다."
  },
  {
    id: "char_pink",
    name: "Pink",
    img: [],
    previewUrls: [],
    thumbnail: 0,
    path: "pink",
    memo: "분홍색 캐릭터입니다."
  },
  {
    id: "char_sky",
    name: "Sky",
    img: [],
    previewUrls: [],
    thumbnail: 0,
    path: "sky",
    memo: "하늘색 캐릭터입니다."
  }
];


const createDefaultScript = (): LineItem => {
  const defaultActorId = nanoid();
  const defaultCharacterId = DEFAULT_CHARACTERS[0].id;
  const defaultCharacterName = DEFAULT_CHARACTERS[0].name;

  return {
    id: nanoid(),
    actors: [
      {
        id: defaultActorId,
        characterId: defaultCharacterId,
        characterImageIdx: 0,
        actorState: 0,
        actorEffect: ""
      }
    ],
    speakers: [defaultCharacterName],
    text: "",
    effect: ""
  };
};

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
  selectedLineIndex: 0,
  characterList: DEFAULT_CHARACTERS,
  selectedCharacter: DEFAULT_CHARACTERS[0],

  // ===== Actions =====
  setProjectInfo: (info) => set((state) => ({
    projectInfo: { ...state.projectInfo, ...info }
  })),
  setLang: (lang) => set({ lang }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setActiveTool: (tool) => set({ activeTool: tool }),

  // --- Scriptor Actions ---
  addLineItem: () => set((state) => {
    const newItem = createDefaultScript();
    const newList = [...state.lineItems, newItem];
    return {
      lineItems: newList,
      selectedIndex: newList.length - 1
    };
  }),

  // [추가] 특정 위치에 삽입
  insertLineItem: (idx) => set((state) => {
    const newItem = createDefaultScript();
    const newList = [...state.lineItems];
    newList.splice(idx, 0, newItem);
    return {
      lineItems: newList,
      selectedIndex: idx
    };
  }),

  removeLineItem: (idx) => set((state) => {
    const newList = state.lineItems.filter((_, i) => i !== idx);
    const nextIdx = Math.max(0, state.selectedLineIndex >= idx ? state.selectedLineIndex - 1 : state.selectedLineIndex);
    return {
      lineItems: newList.length > 0 ? newList : [createDefaultScript()],
      selectedIndex: newList.length > 0 ? nextIdx : 0
    };
  }),

  // [추가] 라인 순서 변경 (Swap/Move)
  moveLineItem: (from, to) => set((state) => {
    if (to < 0 || to >= state.lineItems.length) return state;
    const newList = [...state.lineItems];
    const [movedItem] = newList.splice(from, 1);
    newList.splice(to, 0, movedItem);
    return {
      lineItems: newList,
      selectedIndex: to
    };
  }),

  setSelectedIndex: (idx) => set({ selectedLineIndex: idx }),

  updateLineText: (lineId, newText) => set((state) => ({
    lineItems: state.lineItems.map((item) =>
      item.id === lineId
        ? { ...item, text: newText }
        : item
    ),
  })),

  updateLineActors: (lineId, actors, speakers) => set((state) => ({
    lineItems: state.lineItems.map((item) =>
      item.id === lineId
        ? { ...item, actors, speakers }
        : item
    ),
  })),

  // [추가] 액터 속성 부분 수정 (이미지 인덱스 변경 등)
  updateActorProperty: (lineId, actorId, property) => set((state) => ({
    lineItems: state.lineItems.map(item =>
      item.id === lineId
        ? {
          ...item,
          actors: item.actors.map(actor =>
            actor.id === actorId ? { ...actor, ...property } : actor
          )
        }
        : item
    )
  })),

  updateCharacterList: (newCharacters) => set({ characterList: newCharacters }),

  // --- Character Actions ---
  setSelectedCharacter: (char) => set({ selectedCharacter: char }),

  updateSelectedCharacter: (updated) => set((state) => {
    const newList = state.characterList.map(c =>
      c.id === state.selectedCharacter?.id ? updated : c
    );
    return {
      characterList: newList,
      selectedLineIndex: state.selectedLineIndex,
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
    const { selectedCharacter, addCharacterImageList } = get();
    if (!selectedCharacter) return;
    addCharacterImageList([file]);
  },

  addCharacterImageList: (files: File[]) => set((state) => {
    if (!state.selectedCharacter) return state;
    const newUrls = files.map(file => URL.createObjectURL(file));
    const updatedCharacter = {
      ...state.selectedCharacter,
      img: [...state.selectedCharacter.img, ...files],
      previewUrls: [...state.selectedCharacter.previewUrls, ...newUrls],
    };
    return {
      selectedCharacter: updatedCharacter,
      characterList: state.characterList.map(c =>
        c.id === updatedCharacter.id ? updatedCharacter : c
      ),
    };
  }),

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

  changeCharacterThumbnail: (index: number): boolean => {
    const { selectedCharacter, updateSelectedCharacter } = get();
    if (!selectedCharacter) return false;
    const isValidIndex = index >= 0 && index < selectedCharacter.img.length;
    if (!isValidIndex) return false;
    updateSelectedCharacter({ ...selectedCharacter, thumbnail: index });
    return true;
  },

  initDefaultCharacterImages: async () => {
    const { characterList } = get();
    const updatedCharacters = await Promise.all(
      characterList.map(async (char) => {
        const count = char.path === "pink" ? 3 : 4;
        const imgFiles: File[] = [];
        const previewUrls: string[] = [];
        for (let i = 1; i <= count; i++) {
          const fileName = `${char.path}${i}.png`;
          const filePath = `/assets/${fileName}`;
          try {
            const response = await fetch(filePath);
            if (!response.ok) continue;
            const blob = await response.blob();
            const file = new File([blob], fileName, { type: "image/png" });
            imgFiles.push(file);
            previewUrls.push(URL.createObjectURL(blob));
          } catch (e) {
            console.error(`${fileName} 로드 실패:`, e);
          }
        }
        return { ...char, img: imgFiles, previewUrls };
      })
    );
    set({
      characterList: updatedCharacters,
      selectedCharacter: updatedCharacters[0]
    });
  },

  updateCharacterImage: (idx: number, newFile: File) => {
    let isSuccess = false;
    set((state) => {
      if (!state.selectedCharacter || !state.selectedCharacter.img[idx]) return state;
      const newUrl = URL.createObjectURL(newFile);
      const newImgList = [...state.selectedCharacter.img];
      const newPreviewList = [...state.selectedCharacter.previewUrls];
      newImgList[idx] = newFile;
      newPreviewList[idx] = newUrl;
      const updatedCharacter = {
        ...state.selectedCharacter,
        img: newImgList,
        previewUrls: newPreviewList,
      };
      isSuccess = true;
      return {
        selectedCharacter: updatedCharacter,
        characterList: state.characterList.map((c) =>
          c.id === updatedCharacter.id ? updatedCharacter : c
        ),
      };
    });
    return isSuccess;
  },

  // --- Reset Actions ---
  resetAll: () => set({
    projectInfo: { projectName: 'New Project', width: 1920, height: 1080, resourcePath: './Resources/' },
    lang: "en",
    darkMode: false,
    activeTool: TOOLS.PROJECT,
    images: [],
    lineItems: [createDefaultScript()],
    selectedLineIndex: 0,
    characterList: DEFAULT_CHARACTERS,
    selectedCharacter: DEFAULT_CHARACTERS[0]
  })
}));

export const useCurrentLine = () => {
  return useStore((state) => state.lineItems[state.selectedLineIndex] ?? null);
};