import { useObservable } from "../../hooks/useObservable";
import { useStores } from "../../AppProvider";
import Scriptor from "./tab/scriptor/Scriptor";
import Editer from "./tab/editer/Editer";
import Workspace from "./Workspace";
import { TOOLS } from "./Workspace";
import Character from "./tab/character/Character";

export default function Canvas() {
  const { appStore } = useStores();
  const activeTool = useObservable(
    appStore.activeTool$,
    appStore.activeTool
  );

  return (
    <div
      style={{
        minWidth: '1000px',
        minHeight: '100px',
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >

      {activeTool === TOOLS.SCRIPTOR && <Scriptor />}
      {activeTool === TOOLS.CHARACTER && <Character />}
      {activeTool === TOOLS.EDITER && <Editer />}
    </div>
  );
}