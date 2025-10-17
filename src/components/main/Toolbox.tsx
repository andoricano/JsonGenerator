import { useAppStore } from "../../AppProvider";

export default function Toolbox() {

  const handleNew = () => {
    console.log("image upload");
  };

  const handleSetting = () => {
    console.log("Sizing");
  };

  const buttons = [
    { label: "image upload", onClick: handleNew },
    { label: "Sizing", onClick: handleSetting },
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