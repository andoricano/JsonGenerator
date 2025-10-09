import { useObservable } from "../../../../../hooks/useObservable";
import { useStores } from "../../../../../AppProvider";
import { useState } from "react";
import Dialog from "../../../../Dialog";
import ImageUploader from "./Uploader";



export default function User() {
  const { appStore } = useStores();
  const projectName = useObservable(appStore.projectName$, appStore.projectName);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = (newName: string) => {
    appStore.setProjectName(newName);
    setDialogOpen(false);
  };
  return (
    <>
      <main>
        <ImageUploader/>
      </main>

      <Dialog
        open={dialogOpen}
        title="프로젝트 이름 변경"
        placeholder="새 프로젝트 이름"
        defaultValue={projectName}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}