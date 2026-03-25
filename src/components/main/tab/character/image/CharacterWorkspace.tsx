import { useState, useEffect } from "react";
import AsideToolbar from "../image/AsideToolbar";
import ImageUploaderDialog from "./CharacterImageUploader";
import { useStore } from "../../../../../stores/useStore";
import { AppState } from "../../../../../stores/storeType";
import CharacterImageGrid from "./CharacterImageGrid";

export default function CharacterWorkspace() {
  const selectedCharacter = useStore((state: AppState) => state.selectedCharacter);
  const addCharacterImageList = useStore((state: AppState) => state.addCharacterImageList);
  const changeCharacterThumbnail = useStore((state: AppState) => state.changeCharacterThumbnail);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [viewIdx, setViewIdx] = useState(0);

  useEffect(() => {
    if (selectedCharacter) {
      setViewIdx(selectedCharacter.thumbnail || 0);
    }
  }, [selectedCharacter?.id]);

  if (!selectedCharacter) {
    return <div style={styles.empty}>캐릭터를 선택해주세요.</div>;
  }

  const handleSelectIndex = (idx: number) => {
    setViewIdx(idx);
  };

  const handleAddImages = (files: File[]) => {
    addCharacterImageList(files);
  };

  const handleSetThumbnail = () => {
    changeCharacterThumbnail(viewIdx);
    alert(`${viewIdx + 1}번 이미지가 대표 이미지로 설정되었습니다.`);
  };

  const buttons = [
    { label: "Upload", onClick: () => setIsDialogOpen(true) },
    { label: "Set Thumbnail", onClick: handleSetThumbnail },
    { label: "Delete", onClick: () => console.log("Delete logic") },
  ];

  const currentPreviewUrl = selectedCharacter.previewUrls[viewIdx];

  return (
    <div style={styles.container}>
      <AsideToolbar buttons={buttons} />

      <div style={styles.mainArea}>
        {/* 상단: 크게 보여주는 이미지 섹션 */}
        <div style={styles.viewerSection}>
          {currentPreviewUrl ? (
            <div style={styles.largeImageWrapper}>
              <img src={currentPreviewUrl} alt="Selected Large" style={styles.largeImage} />
            </div>
          ) : (
            <div style={styles.noImageBadge}>선택된 이미지가 없습니다</div>
          )}
        </div>

        {/* 하단: 그리드 갤러리 섹션 */}
        <div style={styles.gridSection}>
          <CharacterImageGrid
            imgList={selectedCharacter.previewUrls}
            selectedIdx={viewIdx} // 그리드에서도 현재 보고 있는 viewIdx를 하이라이트
            onSelected={handleSelectIndex}
          />
        </div>
      </div>

      <ImageUploaderDialog
        isOpen={isDialogOpen}
        onConfirm={handleAddImages}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    gap: "12px",
    boxSizing: "border-box",
    backgroundColor: "#fafafa",
    borderRadius: "12px",
    overflow: "hidden"
  },

  mainArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "12px",
    boxSizing: "border-box",
    gap: "12px",
    height: "100%"
  },

  viewerSection: {
    flex: 1.2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #eee",
    overflow: "hidden",
    padding: "10px"
  },

  largeImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    borderRadius: "4px"
  },

  gridSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #eee",
    overflow: "hidden"
  },

  noImageBadge: {
    color: "#ccc",
    fontSize: "14px"
  },

  empty: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#999"
  }
};