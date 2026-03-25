import { useStore } from "../../stores/useStore";
import { TOOLS, AppState } from "../../stores/storeType";
import SideCharacterBar from "./SideCharacterBar";
import SideScriptBar from "./SideScriptBar";

export default function SideBar() {
    const activeTool = useStore((state) => state.activeTool);

    const addLineItem = useStore((state: AppState) => state.addLineItem);
    const addCharacter = useStore((state: AppState) => state.addCharacter);

    const handleAdd = () => {
        switch (activeTool) {
            case TOOLS.SCRIPTOR:
                addLineItem();
                break;

            case TOOLS.CHARACTER:
                addCharacter();
                break;

            default:
                break;
        }
    };

    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
            }}
        >
            {activeTool === TOOLS.SCRIPTOR && <SideScriptBar />}
            {activeTool === TOOLS.CHARACTER && <SideCharacterBar />}

            <div
                style={{
                    padding: "8px",
                    borderTop: "1px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <button
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                    onClick={handleAdd}
                >
                    +
                </button>
            </div>
        </div>
    );
}