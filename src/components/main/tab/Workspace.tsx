import { useStores } from "../../../AppProvider";
import { useObservable } from "../../../hooks/useObservable";


export default function Workspace() {
  const { headerStore } = useStores();
  const activeTool = useObservable(headerStore.activeTool$, headerStore.activeTool);

  const tools = [
    { label: "Scriptor" },
    { label: "Theme" },
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
      <h1
        style={{
          width: "10%",
          margin: "0px",
          fontSize: "18px",
          textAlign: "center",
          padding: "8px 0",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          boxSizing:"border-box"
        }}>
          Workspace</h1>

      <div style={{ display: "flex", gap: "50px" }}>
        {tools.map((tool) => (
          <div
            key={tool.label}
            onClick={() => headerStore.setActiveTool(tool.label)}
            style={{
              padding: "6px 0px",
              cursor: "pointer",
              borderBottom:
                activeTool === tool.label ? "3px solid #007bff" : "3px solid transparent",
              color: activeTool === tool.label ? "#007bff" : "#555",
              fontWeight: activeTool === tool.label ? "bold" : "normal",
              transition: "all 0.2s",
            }}
          >
            {tool.label}
          </div>
        ))}
      </div>
    </div>
  );
}