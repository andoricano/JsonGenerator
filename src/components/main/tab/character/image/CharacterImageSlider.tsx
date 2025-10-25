import { useEffect, useState } from "react";

type CharacterImageSliderProps = {
  imgList: File[];
  selectedIdx: number;
  onSelected: (index: number) => void;
};
export default function CharacterImageSlider({
  imgList,
  selectedIdx,
  onSelected,
}: CharacterImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIdx);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const urls = imgList.map(file => URL.createObjectURL(file));
    setImages(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imgList]);

  useEffect(() => {
    setCurrentIndex(selectedIdx);
  }, [selectedIdx]);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
    onSelected(index);
  };

  if (imgList.length === 0) {
    return <div style={{ padding: "20px", color: "#ccc" }}>이미지가 없습니다.</div>;
  }

  return (
    <div>
      <MainImage src={images[currentIndex]} />
      <ThumbnailList
        images={images}
        currentIndex={currentIndex}
        onClick={handleClick}
      />
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