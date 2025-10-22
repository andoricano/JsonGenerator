type Character = {
  name: string;
  img: File[];
  selectedImageIndex: number;
};

type ScriptCharacter = {
  character: Character;
  position: number;    
  tone: number;        
};


type Script = {
  id: string;
  character: ScriptCharacter[];
  text: string;
};

type Scene = {
  id: string;
  script: Script[];
};