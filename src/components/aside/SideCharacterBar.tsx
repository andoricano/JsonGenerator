import { useEffect, useRef } from "react";
import { useStore } from "../../stores/useStore";
import { AppState } from "../../stores/storeType";

export default function SideCharacterBar() {
  const characterList = useStore((state: AppState) => state.characterList);
  const selectedCharacter = useStore((state: AppState) => state.selectedCharacter);
  const setSelectedCharacter = useStore((state: AppState) => state.setSelectedCharacter);

  const containerRef = useRef<HTMLDivElement>(null);

  // 새로운 캐릭터가 추가될 때만 맨 아래로 스크롤
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [characterList.length]);

  return (
    <div ref={containerRef} style={styles.container}>
      {characterList.map((character, idx) => {
        const isSelected = selectedCharacter?.id === character.id;

        // 스토어에서 관리하는 previewUrls의 썸네일 인덱스 참조
        const profileUrl = character.previewUrls?.[character.thumbnail] || null;

        return (
          <div
            key={character.id}
            onClick={() => setSelectedCharacter(character)}
            style={{
              ...styles.characterItem,
              background: isSelected ? "#e3f2fd" : "#ffffff", // 선택 시 연한 파란색
              border: isSelected ? "2px solid #2196f3" : "2px solid #eee",
              boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
            }}
          >
            <div style={styles.characterName}>
              {idx + 1}. {character.name}
            </div>

            {profileUrl ? (
              <img
                src={profileUrl}
                alt={`${character.name}-thumbnail`}
                style={styles.characterImage}
              />
            ) : (
              <div style={styles.noImage}>이미지 없음</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px',
    overflowY: 'auto',
    height: '100%',
    backgroundColor: '#f8f9fa',
  },
  characterItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  characterName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  characterImage: {
    width: '100%',
    height: '100px',
    objectFit: 'contain',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  noImage: {
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    color: '#aaa',
    border: '1px dashed #ccc',
    borderRadius: '4px',
  }
};