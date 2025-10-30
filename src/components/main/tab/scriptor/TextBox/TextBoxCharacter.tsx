import { ScriptCharacter } from "../../../../../scene";

type TextBoxChracterProps = {
  scriptCharacter: ScriptCharacter[];
};

export default function TextBoxChracter(
  { scriptCharacter }: TextBoxChracterProps
) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        margin: "5px",
        borderBottom: "1px solid #ccc",
        padding: "8px 15px",
      }}
    >
      {scriptCharacter.map((sc, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: "8px",
            padding: "4px 10px",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#333",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
          }}
        >
          {sc.character.name}
        </div>
      ))}
    </div>
  );
}
