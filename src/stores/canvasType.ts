export interface ImageResource {
  id: string;
  name: string;
  img: File[];
  thumbnail: number;
  path: string;
}

export interface Character {
  id: string;
  name: string;
  img: File[];
  previewUrls: string[];
  thumbnail: number;
  memo: string;
  path: string;
}

export interface LineActor {
  id: string;

  characterId: string;
  characterImageIdx: number;

  actorState: number;
  actorEffect: string;
}

export interface LineItem {
  id: string;
  actors: LineActor[];
  speakers: string[];
  text: string;
  effect: string;
}

export interface Project {
  id: string;
  projectName: string;
  width: number;
  height: number;
  resourcePath: string;
  description: string;
  lastModified: number;
}

export interface ScriptWorkspace {
  project: Project;
  characters: Character[];
  lines: LineItem[];
}