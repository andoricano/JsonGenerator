import { useEffect, useRef } from "react";
import { useAppStore } from "../../AppProvider";

export default function ChatList() {
  const { scriptItems, selectedIndex, setSelectedIndex } = useAppStore();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [scriptItems]);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "8px",
      }}
    >
      {scriptItems.map((item, idx) => {
        const isSelected = idx === selectedIndex;
        return (
          <div
            key={item.id ?? idx}
            onClick={() => setSelectedIndex(idx)}
            style={{
              marginBottom: "8px",
              padding: "8px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              flexDirection: "column",
              cursor: "pointer",
              background: isSelected ? "#cde4ff" : "#f0f0f0",
              transition: "background 0.2s",
            }}
          >
            <div style={{ fontWeight: "bold", color: "#555" }}>
              {idx + 1}. {item.character.name}
            </div>
            <div
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
                lineHeight: "1.4",
              }}
            >
              {item.scriptString.script}
            </div>
          </div>
        );
      })}
    </div>
  );
}