import React from 'react';
export function SpeakerSection({
    actors,         // 현재 라인의 출연진 (LineActor[])
    characterList,  // 캐릭터 메타 정보 (Character[])
    selectedNames,  // 현재 선택된 발화자 이름들 (string[])
    onChange        // (names: string[]) => void
}: {
    actors: any[],
    characterList: any[],
    selectedNames: string[],
    onChange: (names: string[]) => void
}) {
    // ID가 아닌 이름(speakers) 기반으로 체크
    const toggleSpeaker = (name: string) => {
        const updated = selectedNames.includes(name)
            ? selectedNames.filter(n => n !== name)
            : [...selectedNames, name];
        onChange(updated);
    };

    return (
        <div style={styles.section}>
            <label style={styles.label}>Speakers (Who is talking?)</label>
            <div style={styles.speakerGrid}>
                {actors.map(actor => {
                    const charInfo = characterList.find(c => c.id === actor.characterId);
                    if (!charInfo) return null;

                    const isSelected = selectedNames.includes(charInfo.name);

                    return (
                        <button
                            key={actor.id}
                            onClick={() => toggleSpeaker(charInfo.name)}
                            style={{
                                ...styles.speakerBadge,
                                backgroundColor: isSelected ? "#28a745" : "#f0f0f0", // 발화자는 녹색 계열로 차별화
                                color: isSelected ? "#fff" : "#666",
                                borderColor: isSelected ? "#1e7e34" : "#ddd",
                            }}
                        >
                            {charInfo.name}
                            {isSelected && <span style={styles.checkMark}>✓</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}


const styles: Record<string, React.CSSProperties> = {
    section: { display: "flex", flexDirection: "column", gap: "8px" },
    label: { fontSize: "11px", fontWeight: "bold", color: "#8e8e8e", textTransform: "uppercase" },
    speakerGrid: { display: "flex", flexWrap: "wrap", gap: "6px" },
    speakerBadge: {
        padding: "6px 12px",
        fontSize: "12px",
        borderRadius: "16px",
        border: "1px solid",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.1s ease",
        fontWeight: 500,
    },
    checkMark: { fontSize: "10px", marginLeft: "2px" }
};