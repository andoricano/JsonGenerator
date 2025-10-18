import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../../../../AppProvider';


export default function CharacterImageSlider() {
    const { selectedCharacter } = useAppStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (selectedCharacter) {
            setCurrentIndex(selectedCharacter.represent ?? 0);
        }
    }, [selectedCharacter]);

    if (!selectedCharacter) {
        return (
            <div style={styles.container}>
                <div style={{ color: "white", padding: "16px" }}>
                    선택된 캐릭터가 없습니다.
                </div>
            </div>
        );
    }

    if (!selectedCharacter) {
        return (
            <div style={styles.container}>
                <div style={{ color: "white", padding: "16px" }}>
                    선택된 캐릭터가 없습니다.
                </div>
            </div>
        );
    }

    const images = selectedCharacter.img.map((src) => `/assets/${src}`);

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <div style={styles.mainImageBox}>
                    <img
                        src={images[currentIndex]}
                        alt="main"
                        style={styles.mainImage}
                    />
                </div>

                <div style={styles.thumbnailContainer}>
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`thumb-${i}`}
                            onClick={() => handleThumbnailClick(i)}
                            style={{
                                ...styles.thumbnail,
                                border:
                                    i === currentIndex
                                        ? "2px solid #4caf50"
                                        : "2px solid transparent",
                                opacity: i === currentIndex ? 1 : 0.6,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}



export const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: "70%",
        minWidth: "200px",
        backgroundColor: "black",
        height: "100%",
        boxSizing: "border-box",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        marginRight: "10px",
    },
    wrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
    },
    mainImageBox: {
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: "8px",
    },
    mainImage: {
        maxWidth: "1000%",
        maxHeight: "90%",
        objectFit: "contain",
        display: "block",
        margin: "0 auto",
        boxSizing:"border-box"
    },
    thumbnailContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        overflowX: "auto",
        width: "100%",
    },
    thumbnail: {
        width: "48px",
        height: "48px",
        objectFit: "cover",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.2s",
    },
};