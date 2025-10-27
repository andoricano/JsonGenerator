import { nanoid } from 'nanoid';


export type Character = {
  name: string;
  img: File[];
  selectedImageIndex: number;
};

export type ScriptCharacter = {
  character: Character;
  position: number;
  tone: number;
};


export type Script = {
  id: string;
  character: ScriptCharacter[];
  text: string;
};

// type Scene = {
//   id: string;
//   script: Script[];
// };


export const defaultCharacter: Character[] = [
  {
    name: "User",
    img: [],
    selectedImageIndex: 0
  },
  {
    name: "mascot",
    img: [],
    selectedImageIndex: 0
  }
];
export const defaultScriptCharacter: ScriptCharacter[] = [
  {
    character: defaultCharacter[0],
    position: 0,
    tone: 1,
  },
];

export const defaultScript: Script = {
  id: nanoid(),
  character: [
    {
      character: defaultCharacter[0],
      position: 0,
      tone: 1,
    },
  ],
  text: "",
};