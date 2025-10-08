import { useObservable } from "../../hooks/useObservable";
import { useStores } from "../../AppProvider";
import Scriptor from "./tab/scriptor/Scriptor";
import Theme from "./tab/theme/Theme";
import Editer from "./tab/editer/Editer";
import Workspace from "./Workspace";
import Config from "./tab/config/Config";
import { TOOLS } from "./Workspace";

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
      <Workspace />

      {activeTool === TOOLS.SCRIPTOR && <Scriptor />}
      {activeTool === TOOLS.THEME && <Theme />}
      {activeTool === TOOLS.EDITER && <Editer />}
      {activeTool === TOOLS.CONFIG && <Config />}
    </div>
  );
}