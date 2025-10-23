import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../AppProvider";


export default function SideCharacterBar() {
    const { characterList, selectedCharacter, setSelectedCharacter } = useAppStore();
    const containerRef = useRef<HTMLDivElement>(null);

    const [characterUrls, setCharacterUrls] = useState<(string | null)[]>([]);

    // useEffect(() => {
    //     const urls = characterList.map(char => 
    //         char.img && char.img.length > 0 ? URL.createObjectURL(char.img[char.represent]) : null
    //     );
    //     setCharacterUrls(urls);

    //     return () => {
    //         urls.forEach(url => url && URL.revokeObjectURL(url));
    //     };
    // }, [characterList]);

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
                const profileUrl = characterUrls[idx];

                return (
                    <div
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
                            // background: isSelected ? "#cde4ff" : "#f0f0f0",
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