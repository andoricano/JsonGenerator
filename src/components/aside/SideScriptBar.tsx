import { useEffect, useRef } from "react";
import { useStore } from "../../stores/useStore";

export default function SideScriptBar() {
  const lineItems = useStore((state) => state.lineItems);
  const characterList = useStore((state) => state.characterList);
  const selectedLineIndex = useStore((state) => state.selectedLineIndex);
  const setSelectedIndex = useStore((state) => state.setSelectedIndex);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lineItems.length]);

  return (
    <div ref={containerRef} style={styles.container}>
      {lineItems.map((item, idx) => {
        const isSelected = idx === selectedLineIndex;

        const firstActor = item.actors[0];

        const char = characterList.find((c) => c.id === firstActor?.characterId);

        const imageUrl = char?.previewUrls[firstActor?.characterImageIdx ?? 0];

        return (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(idx)}
            style={{
              ...styles.item,
              background: isSelected ? "#cde4ff" : "#f0f0f0",
              outline: isSelected ? "2px solid #007bff" : "none",
            }}
          >
            <div style={styles.row}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={char?.name}
                  style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "4px" }}
                />
              ) : (
                <div style={{ width: 50, height: 50, background: "#ccc", borderRadius: "4px" }} />
              )}

              <div>
                <div style={styles.characterName}>
                  {idx + 1}. {char?.name || "알 수 없음"}
                </div>
                <div style={styles.scriptText}>
                  {firstActor?.actorText || "대사를 입력해주세요."}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    padding: "8px",
    backgroundColor: "#fff",
    userSelect: "none",
  },
  item: {
    marginBottom: "8px",
    padding: "8px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    flexDirection: "column",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  characterName: {
    fontWeight: "bold",
    color: "#555",
    fontSize: "13px",
    marginBottom: "2px",
  },
  scriptText: {
    fontSize: "14px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    lineHeight: "1.4",
    color: "#333",
  },
};