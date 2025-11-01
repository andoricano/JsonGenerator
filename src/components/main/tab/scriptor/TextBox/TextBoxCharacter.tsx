import { ScriptCharacter } from "../../../../../scene";

type TextBoxChracterProps = {
  scriptCharacter: ScriptCharacter[];
};

export default function TextBoxChracter(
  { scriptCharacter }: TextBoxChracterProps
) {
  if (!scriptCharacter || scriptCharacter.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.userButton}>캐릭터가 없습니다. 여기를 눌러 설정해주세요.</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {scriptCharacter.map((sc, index) => (
        <div key={index} style={styles.userButton}>
          {sc?.character?.name?.trim() ? sc.character.name : "no"}
        </div>
      ))}
    </div>
  );
}


const styles: Record<string, React.CSSProperties> = {

  container:
  {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    margin: "5px",
    borderBottom: "1px solid #ccc",
    padding: "8px 15px",
  },
  userButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    padding: "4px 10px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
    whiteSpace: "nowrap",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
  }
};