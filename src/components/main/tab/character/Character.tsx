import React, { useEffect, useState } from "react";
import { useAppStore } from "../../../../AppProvider";
import Toolbox from "../../Toolbox";
import CharacterImageSlider from "./info/CharacterImageSlider";


export default function Character() {
  const { selectedCharacter } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 대표 이미지 인덱스로 초기화
  useEffect(() => {
    if (selectedCharacter) {
      setCurrentIndex(selectedCharacter.represent ?? 0);
    }
  }, [selectedCharacter]);

  // 캐릭터 없을 때
  if (!selectedCharacter) {
    return (
      <div style={styles.container}>
        <div style={{ color: "white", padding: "16px" }}>
          선택된 캐릭터가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Toolbox/>
      <CharacterImageSlider/>
    </div>
  );
}

export const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "70%",
    minWidth: "200px",
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
    backgroundColor: "#fff",
  },
  mainImage: {
    maxWidth: "100%",
    maxHeight: "100%",
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