import { useAppStore } from "../../AppProvider";
import ScriptList from "./ScriptList";

export default function SideBar() {
    const { addScriptItem } = useAppStore();


  const handleAdd = () => {
    addScriptItem();
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
            <ScriptList />



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
                    onClick={
                        handleAdd
                    }
                >
                    +
                </button>
            </div>
        </div>
    );
}