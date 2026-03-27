import React from 'react';

// props 타입 정의 (보내주신 로직에 맞춰 selectedIds 배열을 받음)
interface SpeakerSectionProps {
    selectedIds: string[];
    list: any[]; // Character[]
    onChange: (newIds: string[]) => void;
}

export function SpeakerSection({ selectedIds, list, onChange }: SpeakerSectionProps) {

    const handleToggle = (characterId: string) => {
        const isAlreadyChecked = selectedIds.includes(characterId);

        const updatedIds = isAlreadyChecked
            ? selectedIds.filter((id) => id !== characterId)
            : [...selectedIds, characterId];

        onChange(updatedIds);
    };

    return (
        <div style={styles.section}>
            <label style={styles.label}>Speakers ({selectedIds.length})</label>
            <div style={styles.speakerGrid}>
                {list.map((char) => {
                    const isSelected = selectedIds.includes(char.id);
                    return (
                        <button
                            key={char.id}
                            onClick={() => handleToggle(char.id)}
                            style={{
                                ...styles.speakerBadge,
                                backgroundColor: isSelected ? "#007bff" : "#f0f0f0",
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