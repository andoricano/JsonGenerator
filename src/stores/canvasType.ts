export interface ImageResource{
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
  thumbnail: number; 
  memo: string;
  path: string;  
}

export interface LineActor{
    id: string;

    characterId: string;
    characterImageIdx: number;

    actorText: string;
    actorState: number;
    actorEffect: string;       
}

export interface LineItem {
  id: string;
  actors : LineActor[];
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