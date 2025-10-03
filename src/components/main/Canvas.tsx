import { useObservable } from "../../hooks/useObservable";
import { useStores } from "../../AppProvider";
import Scriptor from "./scriptor/Scriptor";
import ImageUploader from "./user/Uploader";
import Editer from "./editer/Editer";
import Workspace from "./tab/Workspace";

export default function Canvas() {
  const { headerStore } = useStores();
  const activeTool = useObservable(
    headerStore.activeTool$,
    headerStore.activeTool
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

      {activeTool === "Scriptor" && <Scriptor />}
      {activeTool === "Uploader" && <ImageUploader />}
      {activeTool === "Editer" && <Editer />}
    </div>
  );
}