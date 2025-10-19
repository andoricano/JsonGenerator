import CharacterInfo from "./info/CharacterInfo";
import CharacterWorkspace from "./image/CharacterWorkspace";

export default function Character() {
  return (
    <div style={styles.container}>
      <div style={styles.infoSection}>
        <CharacterInfo />
        <CharacterWorkspace />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    minWidth: "300px",
    height: "100%",
    margin: "10px",
    boxSizing: "border-box",
    borderRadius: "12px",
    backgroundColor: "#dfdff0",
  },
  infoSection: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "12px",
    borderRadius: "12px",
    boxSizing: "border-box",
    gap: "12px",
  },
};