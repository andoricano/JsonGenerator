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
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    infoSection: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        boxSizing: "border-box",
        height: "100%",
        overflow: "hidden",
    },
    inspectorWrapper: {
        flex: 25,
        minWidth: "300px",
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ddd", 
        boxSizing: "border-box",
        overflow: "hidden",
    },
    workspaceWrapper: {
        flex: 75,
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
    },
};