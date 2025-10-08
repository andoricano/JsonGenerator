import { useObservable } from "../../../../hooks/useObservable";
import { useStores } from "../../../../AppProvider";
import { useState } from "react";
import ImageUploader from "./uploader/Uploader";



export default function Editer() {
  const { appStore } = useStores();
  const projectName = useObservable(appStore.projectName$, appStore.projectName);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = (newName: string) => {
    appStore.setProjectName(newName);
    setDialogOpen(false);
  };
  return (
    <div>
      <ImageUploader/>
    </div>
  );
}