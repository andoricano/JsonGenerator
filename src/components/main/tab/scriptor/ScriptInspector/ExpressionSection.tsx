export function ExpressionSection({
    actors,        // 현재 라인의 actors 배열
    characterList, // 전체 캐릭터 정보 리스트
    onChange       // (actorId: string, idx: number) => void
}: {
    actors: any[],
    characterList: any[],
    onChange: (actorId: string, idx: number) => void
}) {
    return (
        <div style={styles.section}>
            <label style={styles.label}>Expressions</label>
            <div style={styles.expressionList}>
                {actors.map((actor) => {
                    const charInfo = characterList.find(c => c.id === actor.characterId);
                    if (!charInfo) return null;

                    return (
                        <div key={actor.id} style={styles.actorExpressionRow}>
                            {/* 화자 이름 표시 */}
                            <div style={styles.actorName}>{charInfo.name}</div>

                            <div style={styles.imageGrid}>
                                {charInfo.previewUrls.map((url: string, idx: number) => {
                                    const isSelected = actor.characterImageIdx === idx;
                                    return (
                                        <div
                                            key={idx}
                                            style={styles.imageWrapper}
                                            onClick={() => onChange(actor.id, idx)}
                                        >
                                            <img
                                                src={url}
                                                alt="face"
                                                style={{
                                                    ...styles.previewImg,
                                                    border: isSelected ? "2px solid #007bff" : "1px solid #e0e0e0",
                                                    opacity: isSelected ? 1 : 0.6,
                                                }}
                                            />
                                            {isSelected && <div style={styles.checkBadge}>✓</div>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: { display: "flex", flexDirection: "column", gap: "10px" },
    label: { fontSize: "11px", fontWeight: "bold", color: "#8e8e8e", textTransform: "uppercase" },
    expressionList: { display: "flex", flexDirection: "column", gap: "20px" },
    actorExpressionRow: { display: "flex", flexDirection: "column", gap: "6px" },
    actorName: { fontSize: "12px", fontWeight: "600", color: "#333", paddingLeft: "2px" },
    imageGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)", // 공간 효율을 위해 5열 추천
        gap: "4px",
        backgroundColor: "#f9f9f9",
        padding: "8px",
        borderRadius: "4px"
    },
    imageWrapper: { position: "relative", cursor: "pointer", aspectRatio: "1/1" },
    previewImg: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "3px" },
    checkBadge: {
        position: "absolute", bottom: "1px", right: "1px", width: "12px", height: "12px",
        backgroundColor: "#007bff", color: "#fff", fontSize: "8px", borderRadius: "2px",
        display: "flex", alignItems: "center", justifyContent: "center"
    }
};