import { useAppStore } from "../../AppProvider";
import Scriptor from "./tab/scriptor/Scriptor";
import Editer from "./tab/editer/Editer";
import { TOOLS } from "./Workspace";
import Character from "./tab/character/Character";
import SideBar from "../aside/SideBar";

export default function Canvas() {
  const { activeTool } = useAppStore();

  return (
    <div style={styles.canvas}>
      <aside style={styles.aside}>
        <SideBar />
      </aside>

      <div style={styles.workspace}>
        {activeTool === TOOLS.SCRIPTOR && <Scriptor />}
        {activeTool === TOOLS.CHARACTER && <Character />}
        {activeTool === TOOLS.EDITER && <Editer />}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  canvas: {
    minWidth: "500px",
    minHeight: "100px",
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  aside: {
    width: "20%",
    height: "100%",
    background: "#ddd",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  workspace: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
  },
};