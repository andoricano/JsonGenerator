import { useEffect, useRef } from "react";
import { useStores } from "../../AppProvider";
import { useObservable } from "../../hooks/useObservable";

export default function ChatList() {
  const { mainStore } = useStores();

  // 스크립트 아이템 리스트
  const scriptList = useObservable(mainStore.scriptItems$, mainStore.scriptItems);

  // 선택된 인덱스
  const selectedIndex = useObservable(mainStore.selectedIndex$, mainStore.selectedIndex);

  const containerRef = useRef<HTMLDivElement>(null);

  // 새 항목 추가 시 자동 스크롤
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
      {scriptList.map((item, idx) => {
        const isSelected = idx === selectedIndex;
        return (
          <div
            key={item.id ?? idx}
            onClick={() => (mainStore.selectedIndex = idx)} // 클릭 시 selectedIndex 갱신
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
        );
      })}
    </div>
  );
}