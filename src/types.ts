import { nanoid } from 'nanoid';


export type ScriptItem = {
  id: string;
  character: Character[];
  snapshot: Snapshot;
  scriptString: ScriptString;
}

export type ScriptString = {
  script: string;
  fontSize: number;
  fontStyle: number;
  fontColor: number;
}

export type Snapshot = {
  id: string;
  name: string;
  character: Character[];
  background: Resource;
  resources: Resource[];
}

export type Character = {
  id: string;
  name: string;
  role: string;
  position: number;
  represent: number;
  img: File[];
}

export type Resource = {
  id: string;
  name: string;
  type: string;
}



export const defaultResource: Resource = {
  id: nanoid(),
  name: "default background",
  type: "image",
};


export const defaultScriptString: ScriptString = {
  script: "",
  fontSize: 16,
  fontStyle: 0,
  fontColor: 0,
}