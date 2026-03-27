import React from 'react';

export function ActorSection({
    selectedIds,   // 현재 선택된 characterId 배열
    list,          // 전체 characterList
    onChange       // (newIds: string[]) => void
}: {
    selectedIds: string[],
    list: any[],
    onChange: (newIds: string[]) => void
}) {
    const toggleActor = (id: string) => {
        const updated = selectedIds.includes(id)
            ? selectedIds.filter(sid => sid !== id)
            : [...selectedIds, id];
        onChange(updated);
    };

    return (
        <div style={styles.section}>
            <label style={styles.label}>Actors (Who is on screen?)</label>
            <div style={styles.speakerGrid}>
                {list.map(char => {
                    const isSelected = selectedIds.includes(char.id);

                    return (
                        <button
                            key={char.id}
                            onClick={() => toggleActor(char.id)}
                            style={{
                                ...styles.speakerBadge,
                                backgroundColor: isSelected ? "#007bff" : "#f0f0f0", // 출연진은 파란색
                                color: isSelected ? "#fff" : "#666",
                                borderColor: isSelected ? "#0056b3" : "#ddd",
                            }}
                        >
                            {char.name}
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