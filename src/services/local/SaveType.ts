export interface SaveItemForm {
    id: string;
    actorPaths: SaveActorItem[];

    speakers: string[];
    text: string;
    effect: string;
}

export interface SaveActorItem {

    actorPath: string;
    actorState: string;
}
