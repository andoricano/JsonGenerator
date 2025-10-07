import { useObservable } from "../../../../hooks/useObservable";
import { useStores } from "../../../../AppProvider";
import { useState } from "react";
import ImageUploader from "./uploader/Uploader";



export default function Editer() {
  const { headerStore } = useStores();
  const projectName = useObservable(headerStore.projectName$, headerStore.projectName);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = (newName: string) => {
    headerStore.setProjectName(newName);
    setDialogOpen(false);
  };
  return (
    <div>
      <ImageUploader/>
    </div>
  );
}