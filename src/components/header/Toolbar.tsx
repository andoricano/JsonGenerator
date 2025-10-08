import { useStores } from "../../AppProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Toolbar() {
  const { mainStore } = useStores();

  const handleNew = () => {
    console.log("New Project");
  };

  const handleSave = () => {
    exportJSON(mainStore.toJSON());
  };

  const handleLoad = () => {
    console.log("Load");
  };

  const handleSetting = () => {
    console.log("Setting");
  };

  const buttons = [
    { label: "New Project", onClick: handleNew },
    { label: "Save", onClick: handleSave },
    { label: "Load", onClick: handleLoad },
    { label: "Setting", onClick: handleSetting },
  ];


  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "8px 12px",
      }}
    >
      {buttons.map((btn) => (
        <button
          key={btn.label}
          style={buttonStyle}
          onClick={btn.onClick}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#eaeaea")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#f5f5f5")
          }
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "scale(0.97)")
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          {btn.label}
        </button>
      ))}

      <LanguageSwitcher/>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "10px 18px",
  fontSize: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  background: "#f5f5f5",
  cursor: "pointer",
  transition: "background 0.2s, transform 0.1s",
};


function exportJSON(data: object, filename = "footer.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}