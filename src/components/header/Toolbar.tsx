import { mockupSaveProjectLog } from "../../services/local/saveService";
import { useStore } from "../../stores/useStore";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Toolbar() {
  const resetAll = useStore((state) => state.resetAll);
  const characterList = useStore((state) => state.characterList);
  const projectName = useStore((state) => state.projectInfo.projectName);
  const lineItems = useStore((state) => state.lineItems); // 추가

  const handleNew = () => {
    if (window.confirm("새 프로젝트를 시작하시겠습니까? 현재 데이터는 초기화됩니다.")) {
      resetAll();
      console.log("New Project");
    }
  };

  const handleSave = () => {
    mockupSaveProjectLog(lineItems, characterList, projectName);
  };

  const handleLoad = () => {
    console.log("Load");
  };


  const buttons = [
    { label: "New Project", onClick: handleNew },
    { label: "Save", onClick: handleSave },
    { label: "Load", onClick: handleLoad },
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
          onMouseOver={(e) => (e.currentTarget.style.background = "#eaeaea")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {btn.label}
        </button>
      ))}

      <LanguageSwitcher />
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

function exportJSON(data: object, filename = "data.json") {
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