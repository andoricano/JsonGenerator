export type Script = {
    id: string;
    character: Character;
    snapshot: Snapshot;
    script:string;
    fontSize:number;
    fontStyle:number;
    fontColor:number;
}

export type Snapshot = {
  id: string;
  name : string;
  character : Character [];
  background: Resource;
  resources : Resource[];
}

export type Character = {
  id: string;
  name: string;
  role: "narration"|"player" | "npc";
  position : number;
  tone : number;
  img: string[];
}

export type Resource = {
  id: string;
  name: string;
  type: string;
}
