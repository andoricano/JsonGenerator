import { useEffect, useRef } from "react";
import { useAppStore } from "../../AppProvider";

export default function SideCharacterBar() {
    const { getChracterList, selectedCharacter, setSelectedCharacter } = useAppStore();

    const containerRef = useRef<HTMLDivElement>(null);
    const characterList = getChracterList();

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [characterList]);


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
                        {character.img.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`img-${i}`}
                                style={{ width: 40, height: 40 }}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}