import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../AppProvider";

export default function SideCharacterBar() {
  const { characterList, selectedCharacter, setSelectedCharacter } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const [characterUrls, setCharacterUrls] = useState<(string | null)[]>([]);

  useEffect(() => {
    const urls = characterList.map(char =>
      char.img && char.img.length > 0 ? URL.createObjectURL(char.img[char.selectedImageIndex]) : null
    );
    setCharacterUrls(urls);

    return () => {
      urls.forEach(url => url && URL.revokeObjectURL(url));
    };
  }, [characterList]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [characterList]);

  return (
    <div ref={containerRef} style={styles.container}>
      {characterList.map((character, idx) => {
        const profileUrl = characterUrls[idx];
        const isSelected = selectedCharacter?.name === character.name;

        return (
          <div
            key={character.name ?? idx}
            onClick={() => setSelectedCharacter(character)}
            style={{
              ...styles.characterItem,
              background: isSelected ? "#cde4ff" : "#f0f0f0",
            }}
          >
            <div style={styles.characterName}>
              {idx + 1}. {character.name}
            </div>
            {profileUrl && (
              <img
                src={profileUrl}
                alt={`${character.name}-represent`}
                style={styles.characterImage}
              />
            )}
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
    padding: 8,
  },
  characterItem: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  characterName: {
    fontWeight: "bold",
    color: "#555",
  },
  characterImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    objectFit: "cover",
  },
};