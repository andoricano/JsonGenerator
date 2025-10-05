import { useStores } from "../../../AppProvider";
import { useObservable } from "../../../hooks/useObservable";
import ImageUploader from "../user/Uploader";

export default function Theme() {
  const { headerStore } = useStores();
  const activeTool = useObservable(headerStore.activeTool$, headerStore.activeTool);

  const tools = [
    { label: "Scriptor" },
    { label: "Uploader" },
    { label: "Resouece Editer" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        borderBottom: "2px solid #ccc",
        padding: "6px 10px",
      }}
    >
        {/* <ImageUploader/> */}
    </div>
  );
}