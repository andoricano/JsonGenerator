import { useAppStore } from "../../AppProvider";
import Scriptor from "./tab/scriptor/Scriptor";
import Editer from "./tab/editer/Editer";
import { TOOLS } from "./Workspace";
import Character from "./tab/character/Character";
import SideScriptBar from "../aside/SideScriptBar";
import SideCharacterBar from "../aside/SideCharacterBar";

export default function Canvas() {
  const { activeTool } = useAppStore();

  return (
    <div
      style={{
        minWidth: '1000px',
        minHeight: '100px',
        flex: 1,
        display: "flex",
        flexDirection: "row",
      }}
    >

      <aside
        style={{
          width: '20%',
          height: '100%',
          background: '#ddd',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {activeTool === TOOLS.SCRIPTOR && <SideScriptBar />}
        {activeTool === TOOLS.CHARACTER && <SideCharacterBar />}
      </aside>

      {activeTool === TOOLS.SCRIPTOR && <Scriptor />}
      {activeTool === TOOLS.CHARACTER && <Character />}
      {activeTool === TOOLS.EDITER && <Editer />}
    </div>
  );
}