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


const createDefaultScript = (): LineItem => ({
  id: nanoid(),
  actors: [
    {
      id: nanoid(),
      characterId: DEFAULT_CHARACTERS[0].id,
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
  characterList: DEFAULT_CHARACTERS,
  selectedCharacter: DEFAULT_CHARACTERS[0],

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

    updateSelectedCharacter({
      ...selectedCharacter,
      thumbnail: index
    });

    return true;
  },
  initDefaultCharacterImages: async () => {
    const { characterList } = get();

    const updatedCharacters = await Promise.all(
      characterList.map(async (char) => {
        // 상수 정의대로 black/sky는 4장, pink는 3장 로드
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

            // 1. File 객체 생성
            const file = new File([blob], fileName, { type: "image/png" });
            imgFiles.push(file);

            // 2. 미리보기 URL 생성
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
      // 초기 로드 후 첫 번째 캐릭터를 선택된 상태로 갱신
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

  resetAll: () => set({
    projectInfo: { projectName: 'New Project', width: 1920, height: 1080, resourcePath: './Resources/' },
    lang: "en",
    darkMode: false,
    activeTool: TOOLS.PROJECT,
    images: [],
    lineItems: [createDefaultScript()],
    selectedIndex: 0,
    characterList: DEFAULT_CHARACTERS,
    selectedCharacter: DEFAULT_CHARACTERS[0]
  })
}));