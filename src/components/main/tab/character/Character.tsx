import CharacterInspector from "./info/CharacterInspector";
import CharacterWorkspace from "./image/CharacterWorkspace";
export default function Character() {
  return (
    <div style={styles.container}>
      <div style={styles.infoSection}>
        <aside style={styles.inspectorWrapper}>
          <CharacterInspector />
        </aside>

        <main style={styles.workspaceWrapper}>
          <CharacterWorkspace />
        </main>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "#dfdff0",
    overflow: "hidden",
  },
  infoSection: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    padding: "12px",
    boxSizing: "border-box",
    gap: "12px",
    height: "100%",
    overflow: "hidden",
  },
  inspectorWrapper: {
    width: "270px",
    height: "100%",
    flexShrink: 0,
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  workspaceWrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
  },
};