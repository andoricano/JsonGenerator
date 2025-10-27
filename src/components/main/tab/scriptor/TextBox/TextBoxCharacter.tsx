import { Character, Script } from "../../../../../scene";

type TextBoxChracterProps = {
    scriptString: Script;
    onCharacter: (character: Character) => void;
};

export default function TextBoxChracter(
  { scriptString, onCharacter } : TextBoxChracterProps
) {

  const scriptCharacter = scriptString?.character ?? { name: "Unknown" };

  return (
    <div
      style={{
        margin: "5px",
        borderBottom: "1px solid #ccc",
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