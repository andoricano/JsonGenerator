import { useState, useEffect, useRef } from "react";
import { useAppStore } from "../../AppProvider";



export default function SideScriptBar() {
  const { scriptItems, selectedIndex, setSelectedIndex } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [scriptItems]);

  return (
    <div ref={containerRef} style={styles.container}>
      {scriptItems.map((item, idx) => {
        const isSelected = idx === selectedIndex;
        const char = item.character[0].character;
        const image: File = char?.img?.[char.selectedImageIndex]

        return (
          <div
            key={item.id ?? idx}
            onClick={() => setSelectedIndex(idx)}
            style={{
              ...styles.item,
              background: isSelected ? "#cde4ff" : "#f0f0f0",
            }}
          >
            <div style={styles.row}>
              <CharacterImage
                key={char?.selectedImageIndex}
                file={image}
                name={char?.name}
              />
              <div>
                <div style={styles.characterName}>
                  {idx + 1}. {char?.name ?? "알 수 없음"}
                </div>
                <div style={styles.scriptText}>
                  {item.text.length === 0 ? "대사를 입력해주세요." : item.text ?? ""}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}



function CharacterImage({ file, name }: { file: File; name?: string }) {
  const [src, setSrc] = useState<string | null>(null); 

  useEffect(() => {
    if (!file) {
      setSrc(null); 
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!file || !src) {
    return <div style={{ width: 50, height: 50, background: "#ccc" }}></div>;
  }

  return <img src={src} alt={name} style={{ width: 50, height: 50, objectFit: "cover" }} />;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    padding: "8px",
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
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: "6px",
    objectFit: "cover",
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: "6px",
    backgroundColor: "#ccc",
  },
  characterName: {
    fontWeight: "bold",
    color: "#555",
  },
  scriptText: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    lineHeight: "1.4",
  },
};