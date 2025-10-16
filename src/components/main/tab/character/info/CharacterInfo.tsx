import React from 'react';
import { useAppStore } from '../../../../../AppProvider';


export default function CharacterInfo() {
    const { selectedCharacter } = useAppStore();

    if (!selectedCharacter) {
        return (
            <div style={styles.container}>
                <div style={{ color: "white", padding: "16px" }}>선택된 캐릭터가 없습니다.</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px" }}>
                {selectedCharacter.img && selectedCharacter.img.length > 0 && (
                    <img
                        src={`/assets/${selectedCharacter.img[0]}`}
                        alt={selectedCharacter.name}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "8px",
                            objectFit: "cover",
                        }}
                    />
                )}

                <div style={{ color: "#053b07ff" }}>
                    <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {selectedCharacter.name}
                    </div>
                    <div>역할: {selectedCharacter.role}</div>
                </div>
            </div>
        </div>
    );
}

export const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width:"30%",
        minWidth:"200px",
        marginRight:"10px",
        backgroundColor: "#b5d9b6ff",
        height:"100%",
        minHeight: "500px",
        boxSizing: "border-box",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
    },
};