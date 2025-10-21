import { useAppStore } from "../../AppProvider";

export const TOOLS = {
  SCRIPTOR: "Scriptor",
  CHARACTER: "Character",
  EDITER: "Resource Editer",
} as const;

export type ToolType = typeof TOOLS[keyof typeof TOOLS];

export default function Workspace() {
  const { activeTool, setActiveTool } = useAppStore();

  const tools = [
    { label: TOOLS.SCRIPTOR },
    { label: TOOLS.CHARACTER },
    { label: TOOLS.EDITER },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        borderBottom: "2px solid #ccc",
        padding: "6px 10px",
        backgroundColor:"white"
      }}
    >
      <h1
        style={{
          width: "20%",
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
            onClick={() => setActiveTool(tool.label)}
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