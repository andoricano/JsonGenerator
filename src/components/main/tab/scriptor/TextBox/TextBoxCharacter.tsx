import { Character, Script } from "../../../../../scene";

type TextBoxChracterProps = {
  scriptString: Script;
  onCharacter: (character: Character) => void;
};

export default function TextBoxChracter(
  { scriptString, onCharacter }: TextBoxChracterProps
) {

  const scriptCharacter = scriptString?.character ?? [];
  const firstCharacter = scriptCharacter[0]?.character;
  const characterName = firstCharacter?.name ?? "Unknown";


  return (
    <div
      style={{
        margin: "5px",
        borderBottom: "1px solid #ccc",
        cursor: "pointer",
      }}
      onClick={() => {
        console.log("Character clicked:", firstCharacter);
      }}
    >
      <p
        style={{
          paddingLeft: "15px",
        }}
      >
        {scriptCharacter[0].character.name}
      </p>
    </div>
  );
}