// Slidebar.tsx
import React, { useState } from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    children: React.ReactNode;
};

export default function Slidebar({ isOpen, setIsOpen, children }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={styles.container}>
            {/* 호버 감지 구역: isOpen이 false일 때만 작동 */}
            {!isOpen && (
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={styles.hoverZone}
                >
                    {isHovered && (
                        <button onClick={() => setIsOpen(true)} style={styles.hiddenButton}>
                            ▶
                        </button>
                    )}
                </div>
            )}

            {/* 실제 사이드바 내용 */}
            <div style={{
                ...styles.innerWrapper,
                visibility: isOpen ? "visible" : "hidden",
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.2s"
            }}>
                <div style={styles.header}>
                    <h3 style={styles.headerTitle}>SCRIPT LIST</h3>
                    <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
                        ◀
                    </button>
                </div>
                <div style={styles.content}>{children}</div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    hoverZone: {
        position: "fixed", // aside 너비가 0이 되어도 위치를 유지하기 위해 fixed 사용
        top: 0,
        left: 0,
        bottom: 0,
        width: "20px",
        zIndex: 9999, // 최상단 배치
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    hiddenButton: {
        height: "80px",
        width: "16px",
        backgroundColor: "#333",
        color: "#fff",
        border: "none",
        borderRadius: "0 4px 4px 0",
        cursor: "pointer",
        boxShadow: "2px 0 5px rgba(0,0,0,0.2)"
    },
    innerWrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
    },
    header: {
        padding: "16px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
    },
    headerTitle: { fontSize: "12px", fontWeight: "bold", margin: 0 },
    content: { flex: 1, overflow: "hidden" },
    closeButton: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#999" }
};