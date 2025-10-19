import { useState } from "react";
import Toolbox from "../../Toolbox";
import CharacterImageSlider from "./info/CharacterImageSlider";
import ImageUploaderDialog from "./CharacterImageUploader";


export default function Character() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpload = () => {
    setIsDialogOpen(true);
  };
  const handleResize = () => console.log("Resizing");


  const buttons = [
    { label: "Image Upload", onClick: handleUpload },
    { label: "Sizing", onClick: handleResize },
  ];

  return (
    <div style={styles.container}>
      <Toolbox buttons={buttons} />
      <CharacterImageSlider />
      <ImageUploaderDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
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