import { useState, useEffect } from "react";
import AsideToolbar from "../image/AsideToolbar";
import CharacterImageSlider from "./CharacterImageSlider";
import ImageUploaderDialog from "./CharacterImageUploader";
import { useAppStore } from "../../../../../AppProvider";

export default function CharacterWorkspace() {
  const { selectedCharacter, addCharacterImage, changeCharacterThumbnail } = useAppStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useEffect(() => {
    if (selectedCharacter) {
      setSelectedIdx(selectedCharacter.selectedImageIndex);
    }
  }, [selectedCharacter?.selectedImageIndex]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleAddImage = (file: File) => {
    if (!selectedCharacter) return;
    addCharacterImage(file);
    setSelectedIdx(selectedCharacter.img.length);
  };

  const fileList = selectedCharacter?.img ?? [];

  const buttons = [
    { label: "Upload", onClick: openDialog },
    { label: "Thumbnail", onClick: () => changeCharacterThumbnail(selectedIdx) },
    { label: "Background", onClick: () => console.log("Background") },
    { label: "Order", onClick: () => console.log("Order") },
    { label: "Delete", onClick: () => console.log("Delete") },
  ];


  return (
    <div style={styles.container}>
      <AsideToolbar buttons={buttons} />

      <div style={styles.mainArea}>
        {selectedCharacter && (
          <CharacterImageSlider
            imgList={fileList}
            selectedIdx={selectedIdx}
            onSelected={setSelectedIdx}
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