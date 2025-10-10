import { useEffect, useRef } from "react";
import { useStores } from "../../AppProvider";
import { useObservable } from "../../hooks/useObservable";

export default function ChatList() {
  const { mainStore } = useStores();
  const scriptList = useObservable(mainStore.scriptItems$, mainStore.scriptItems);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [scriptList]);
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
      {scriptList.map((item, idx) => (
        <div
          key={item.id ?? idx}
          style={{
            marginBottom: "8px",
            padding: "8px",
            background: "#f0f0f0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            flexDirection: "column",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#555" }}>
            {idx + 1}. {item.name}
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
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
}