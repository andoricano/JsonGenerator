import { useState, useCallback, useEffect } from "react";
import AsideToolbar from "../image/AsideToolbar";
import CharacterImageSlider from "./CharacterImageSlider";
import ImageUploaderDialog from "./CharacterImageUploader";
import { useAppStore } from "../../../../../AppProvider";


export default function CharacterWorkspace() {
  const { selectedCharacter, addCharacterImage } = useAppStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const handleAddImage = useCallback(
    (file: File) => {
      if (!selectedCharacter) return;
      addCharacterImage(file);
      // selectedCharacter.img는 이미 최신 상태이므로 fileList를 동기화
      setFileList((prev) => [...prev, file]);
    },
    [selectedCharacter, addCharacterImage]
  );

  useEffect(() => {
    if (!selectedCharacter) {
      setFileList([]);
      return;
    }
    setFileList(selectedCharacter.img);
  }, [selectedCharacter]);

  const buttons = [
    { label: "Upload", onClick: openDialog },
    { label: "Thumbnail", onClick: () => console.log("Thumbnail") },
    { label: "Background", onClick: () => console.log("Background") },
    { label: "Order", onClick: () => console.log("Order") },
  ];

  return (
    <div style={styles.container}>
      <AsideToolbar buttons={buttons} />

      <div style={styles.mainArea}>
        {selectedCharacter && (
          <CharacterImageSlider
            imgList={fileList}
            selectedIdx={0}
          />
        )}
      </div>

      <ImageUploaderDialog
        isOpen={isDialogOpen}
        onConfirm={handleAddImage}
        onClose={closeDialog}
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
  },

  mainArea: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    boxSizing: "border-box",
  },
};