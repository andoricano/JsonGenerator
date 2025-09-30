import { useStores } from "../../AppProvider";
import { useObservable } from "../../hooks/useObservable"; 


export default function Workspace() {
    const { headerStore } = useStores();
    const activeTool = useObservable(headerStore.activeTool$, headerStore.activeTool);

    const tools = [
        { label: "Scriptor" },
        { label: "Uploader" },
        { label: "Editer" },
    ];
return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        borderBottom: "2px solid #ccc",
        padding: "8px 16px",
        marginTop: "10px",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "18px" }}>Workspace</h1>

      <div style={{ display: "flex", gap: "12px" }}>
        {tools.map((tool) => (
          <div
            key={tool.label}
            onClick={() => headerStore.setActiveTool(tool.label)}
            style={{
              padding: "6px 12px",
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