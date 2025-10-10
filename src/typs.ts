export type Script = {
    id: string;
    character: Character;
    background: Resource;
    script:string;
    fontSize:number;
    fontStyle:number;
    fontColor:number;
}

export type Character = {
  id: string;
  name: string;
  role: "narration"|"player" | "npc";
  img: string[];
}

export type Resource = {
  id: string;
  name: string;
  type: string;
}
