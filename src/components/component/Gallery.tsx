import { useState } from "react";

type GalleryProps = {
    images: string[];
    onSelecting: (index: number) => void;
    onCancel: () => void;
};

export default function Gallery({ images, onSelecting, onCancel }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            onSelecting(selectedIndex);
        }
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCancel();
    };

    return (
        <div style={styles.overlay} onClick={onCancel}>
            {/* 내부 클릭 시 이벤트 전파 방지 */}
            <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>표정 선택</h3>

                <div style={styles.gridContainer}>
                    {images.map((url, index) => {
                        const isSelected = selectedIndex === index;

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                style={{
                                    ...styles.imageBox,
                                    outline: isSelected ? "3px solid #007bff" : "1px solid #ddd",
                                    outlineOffset: "-3px",
                                    transform: isSelected ? "scale(1.05)" : "scale(1)",
                                    transition: "all 0.1s ease-in-out",
                                }}
                            >
                                <img
                                    src={url} // 이미 생성된 previewUrl 사용
                                    alt={`preview-${index}`}
                                    style={styles.image}
                                    loading="lazy" // 성능 보완
                                />
                            </div>
                        );
                    })}
                </div>

                <div style={styles.buttonContainer}>
                    <button
                        onClick={handleSave}
                        disabled={selectedIndex === null}
                        style={{
                            ...styles.buttonSave,
                            opacity: selectedIndex === null ? 0.5 : 1,
                            cursor: selectedIndex === null ? "not-allowed" : "pointer",
                        }}
                    >
                        선택 완료
                    </button>

                    <button
                        onClick={handleCancel}
                        style={styles.buttonCancel}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },

    dialog: {
        width: 420,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },

    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
    },

    imageBox: {
        width: 80,
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 4,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    buttonContainer: {
        display: "flex",
        gap: 8,
        justifyContent: "flex-end",
    },

    buttonSave: {
        padding: "6px 10px",
        borderRadius: 4,
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.1s",
    },

    buttonCancel: {
        padding: "6px 10px",
        borderRadius: 4,
        border: "none",
        backgroundColor: "#ccc",
        color: "#000",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.1s",
    },
};