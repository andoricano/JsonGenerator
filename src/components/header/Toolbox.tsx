import { useStores } from "../../AppProvider";

export default function Toolbox() {
    const { headerStore } = useStores();

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
                padding: "0 16px",
                borderBottom: "1px solid #ccc",
                gap: "8px",
            }}
        >
            {tools.map((tool) => (
                <button
                    key={tool.label}
                    style={{
                        flex: 1,
                        minWidth: "100px",
                        height: "28px",
                        border: "1px solid #999",
                        borderRadius: "6px",
                        background: "#f9f9f9",
                        cursor: "pointer",
                    }}
                    onClick={() => console.log(`Clicked ${tool.label}`)}
                >
                    {tool.label}
                </button>
            ))}
        </div>
    );
}