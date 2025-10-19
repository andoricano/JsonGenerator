import { useEffect, useState, useCallback } from "react";
import { useAppStore } from "../../../../../AppProvider";

export default function CharacterImageSlider() {
  const { selectedCharacter } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedCharacter)
      setCurrentIndex(selectedCharacter.represent ?? 0);
  }, [selectedCharacter]);

  if (!selectedCharacter) {
    return (
      <EmptyState message="선택된 캐릭터가 없습니다." />
    );
  }

  const images = selectedCharacter.img.map((src) => `/assets/${src}`);

  const handleThumbnailClick = useCallback(
    (index: number) => setCurrentIndex(index),
    []
  );

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <MainImage src={images[currentIndex]} />
        <ThumbnailList
          images={images}
          currentIndex={currentIndex}
          onClick={handleThumbnailClick}
        />
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div style={styles.container}>
      <div style={{ color: "white", padding: "16px" }}>{message}</div>
    </div>
  );
}

function MainImage({ src }: { src: string }) {
  return (
    <div style={styles.mainImageBox}>
      <img src={src} alt="main" style={styles.mainImage} />
    </div>
  );
}

function ThumbnailList({
  images,
  currentIndex,
  onClick,
}: {
  images: string[];
  currentIndex: number;
  onClick: (index: number) => void;
}) {
  return (
    <div style={styles.thumbnailContainer}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`thumb-${i}`}
          onClick={() => onClick(i)}
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
  );
}

export const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    minWidth: "200px",
    height: "100%",
    backgroundColor: "black",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    maxWidth: "100%",
    maxHeight: "90%",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
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