export interface Script {
  id: string;
  title: string;
  characters: ScriptCharacter[];
  resources: string[];
  lines: ScriptLine[];
  description: string;
}

export interface ScriptLine {
  id: string;
  character: ScriptCharacter;
  characterState: number;
  effect:string;
  text: string;
}

export interface ScriptCharacter {
  id: string;
  name: string;
  path: string;
}
