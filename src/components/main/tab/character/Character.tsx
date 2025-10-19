import { useState, useCallback } from "react";
import Toolbox from "../../Toolbox";
import CharacterImageSlider from "./info/CharacterImageSlider";
import ImageUploaderDialog from "./CharacterImageUploader";
import CharacterInfo from "./info/CharacterInfo";

export default function Character() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpload = useCallback(() => setIsDialogOpen(true), []);
  const handleResize = useCallback(() => console.log("Resizing"), []);

  const buttons = [
    { label: "Image Upload", onClick: handleUpload },
    { label: "Sizing", onClick: handleResize },
  ];

  return (
    <div style={styles.container}>
      <Toolbox buttons={buttons} />

      <div style={styles.infoSection}>
        <CharacterInfo />
        <CharacterImageSlider />
      </div>

      {isDialogOpen && (
        <ImageUploaderDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    minWidth: "200px",
    height: "100%",
    padding: "12px",
    marginRight: "10px",
    boxSizing: "border-box",
    borderRadius: "12px",
    backgroundColor: "blue",
  },

  infoSection: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    borderRadius: "12px",
    boxSizing: "border-box",
  },
};