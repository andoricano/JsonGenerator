import { useState, useCallback } from "react";
import AsideToolbar from "../image/AsideToolbar";
import CharacterImageSlider from "./CharacterImageSlider";
import ImageUploaderDialog from "./CharacterImageUploader";

export default function CharacterWorkspace() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);
  const handleResize = useCallback(() => console.log("Thumnail"), []);

  const buttons = [
    { label: "Upload", onClick: openDialog },
    { label: "Thumnail", onClick: handleResize },
    { label: "Background", onClick: handleResize },
    { label: "order", onClick: handleResize },
  ];

  return (
    <div style={styles.container}>
      <AsideToolbar buttons={buttons} />
      <div style={styles.mainArea}>
        <CharacterImageSlider />
      </div>

      <ImageUploaderDialog isOpen={isDialogOpen} onClose={closeDialog} />
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