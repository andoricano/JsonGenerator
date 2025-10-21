import { useEffect, useRef, useMemo } from "react";
import { useAppStore } from "../../AppProvider";

export default function SideCharacterBar() {
    const { characterList, selectedCharacter, setSelectedCharacter } = useAppStore();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [characterList]);

    const characterUrls = useMemo(() => {
        return characterList.map(character => {
            if (!character.img || character.img.length === 0) return null;
            return URL.createObjectURL(character.img[character.represent]);
        });
    }, [characterList]);

    useEffect(() => {
        return () => {
            characterUrls.forEach(url => url && URL.revokeObjectURL(url));
        };
    }, [characterUrls]);

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
            {characterList.map((character, idx) => {
                const isSelected = selectedCharacter?.id === character.id;
                const profileUrl = characterUrls[idx];

                return (
                    <div
                        key={character.id ?? idx}
                        onClick={() => setSelectedCharacter(character)}
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
                            {idx + 1}. {character.name}
                        </div>
                        {profileUrl && (
                            <img
                                src={profileUrl}
                                alt={`${character.name}-represent`}
                                style={{ width: 40, height: 40, borderRadius: "6px", objectFit: "cover" }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}