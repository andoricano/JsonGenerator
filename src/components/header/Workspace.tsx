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
                height: "40px",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                marginTop: "10px",
                gap: "18px",
            }}
        >
            <h1>Workspace</h1>
            {tools.map((tool) => (
                <button
                    key={tool.label}
                    style={{
                        flex: 1,
                        minWidth: "100px",
                        height: "28px",
                        border: "1px solid #999",
                        borderRadius: "6px",
                        background:
                            activeTool === tool.label ? "lightgreen" : "#f9f9f9",
                        cursor: "pointer",
                    }}
                    onClick={() => headerStore.setActiveTool(tool.label)}
                >
                    {tool.label}
                </button>
            ))}
        </div>
    );
}