import { useState } from "react";

type Props = {
  onSelect: (menu: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function Slidebar({ onSelect, isOpen, setIsOpen }: Props) {

  return (
    <>
      {!isOpen && (
        <div
          onMouseEnter={(e) => {
            const btn = document.createElement("button");
            btn.innerText = "▶";
            Object.assign(btn.style, styles.hiddenButton);
            btn.onclick = () => setIsOpen(true);
            e.currentTarget.appendChild(btn);

            e.currentTarget.onmouseleave = () => {
              e.currentTarget.innerHTML = "";
            };
          }}
          style={styles.hoverZone}
        />
      )}

      <div
        style={{
          ...styles.container,
          left: isOpen ? 0 : "-200px",
        }}
      >
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            style={styles.toggleButton}
          >
            ◀
          </button>
        )}

        <div style={styles.sidebarContent}>
          <h3 style={styles.header}>Settings</h3>
          <button onClick={() => onSelect("profile")}>Profile</button>
          <button onClick={() => onSelect("upload")}>Notifications</button>
          <button onClick={() => onSelect("content-box")}>Theme</button>
          <button onClick={() => onSelect("theme")}>About</button>
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    top: 160,
    bottom: 0,
    width: "200px",
    transition: "left 0.3s ease",
  },
  toggleButton: {
    position: "absolute",
    top: "50%",
    right: -13,
    transform: "translateY(-50%)",
    height: 100,
  },
  sidebarContent: {
    height: "100%",
    backgroundColor: "#f5f5f5",
    borderRight: "1px solid #ccc",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  header: {
    marginBottom: "16px",
  },
  hoverZone: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: "16px",
  },
  hiddenButton: {
    position: "absolute",
    top: "50%",
    left: 0,
    height: "100px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "0 4px 4px 0",
    cursor: "pointer",
  },
};
