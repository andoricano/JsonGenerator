import React from 'react';

type CharacterImageGridProps = {
    imgList: string[]; // 스토어의 previewUrls를 직접 받음
    selectedIdx: number;
    onSelected: (index: number) => void;
};

export default function CharacterImageGrid({
    imgList,
    selectedIdx,
    onSelected,
}: CharacterImageGridProps) {

    if (imgList.length === 0) {
        return (
            <div style={styles.emptyState}>
                <p>등록된 이미지가 없습니다.</p>
                <p style={{ fontSize: '12px', color: '#888' }}>Upload 버튼을 눌러 이미지를 추가하세요.</p>
            </div>
        );
    }

    return (
        <div style={styles.scrollContainer}>
            <div style={styles.gridContainer}>
                {imgList.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        onClick={() => onSelected(i)}
                        style={{
                            ...styles.imageCard,
                            border: i === selectedIdx ? "4px solid #4caf50" : "2px solid #eee",
                            transform: i === selectedIdx ? "scale(0.98)" : "scale(1)",
                        }}
                    >
                        <img src={src} alt={`char-img-${i}`} style={styles.image} />

                        {/* 현재 선택된 이미지 표시 (배지) */}
                        {i === selectedIdx && (
                            <div style={styles.selectedBadge}>SELECTED</div>
                        )}

                        {/* 인덱스 표시 */}
                        <div style={styles.indexTag}>{i + 1}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    scrollContainer: {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        padding: "10px",
        boxSizing: "border-box",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "16px",
        paddingBottom: "20px",
    },
    imageCard: {
        position: "relative",
        aspectRatio: "1/1",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#fff",
        transition: "all 0.2s ease-in-out",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    selectedBadge: {
        position: "absolute",
        top: "8px",
        left: "8px",
        backgroundColor: "#4caf50",
        color: "white",
        fontSize: "10px",
        fontWeight: "bold",
        padding: "2px 6px",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    indexTag: {
        position: "absolute",
        bottom: "4px",
        right: "6px",
        color: "rgba(255,255,255,0.8)",
        fontSize: "11px",
        textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
    },
    emptyState: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: "#aaa",
        gap: "8px",
    }
};