
import { useEffect, useState, useMemo } from "react";
import { useAppStore } from "../../../../../AppProvider";

export default function CharacterImageSlider() {
  const { selectedCharacter } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 선택된 캐릭터 변경 시 초기 인덱스 설정
  useEffect(() => {
    if (selectedCharacter) setCurrentIndex(selectedCharacter.represent ?? 0);
  }, [selectedCharacter]);

  if (!selectedCharacter) return <EmptyState message="선택된 캐릭터가 없습니다." />;

  // images 배열을 string | File 혼합 처리
  const images = useMemo(
    () =>
      selectedCharacter.img.map((imgItem) =>
        typeof imgItem === "string" ? `/assets/${imgItem}` : URL.createObjectURL(imgItem)
      ),
    [selectedCharacter]
  );

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <MainImage src={images[currentIndex]} />
        <ThumbnailList
          images={images}
          currentIndex={currentIndex}
          onClick={setCurrentIndex}
        />
      </div>
    </div>
  );
}

// -------------------
// 컴포넌트 분리
// -------------------
function EmptyState({ message }: { message: string }) {
  return (
    <div style={styles.emptyState}>
      {message}
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
        <Thumbnail
          key={i}
          src={src}
          isActive={i === currentIndex}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
}

function Thumbnail({
  src,
  isActive,
  onClick,
}: {
  src: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <img
      src={src}
      alt="thumbnail"
      onClick={onClick}
      style={{
        ...styles.thumbnail,
        border: isActive ? "2px solid #4caf50" : "2px solid transparent",
        opacity: isActive ? 1 : 0.6,
      }}
    />
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