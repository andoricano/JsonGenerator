import { useStores } from "../../../../AppProvider";
import { useObservable } from "../../../../hooks/useObservable";

export default function Theme() {
  const { appStore } = useStores();
  const activeTool = useObservable(appStore.activeTool$, appStore.activeTool);

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
    </div>
  );
}