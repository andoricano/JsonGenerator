import { useObservable } from "../../../../hooks/useObservable";
import { useStores } from "../../../../AppProvider";
import { useState } from "react";



export default function Editer() {
  const { headerStore } = useStores();
  const projectName = useObservable(headerStore.projectName$, headerStore.projectName);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = (newName: string) => {
    headerStore.setProjectName(newName);
    setDialogOpen(false);
  };
  return (
    <>
      <main>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
        <h1>Test!!</h1>
      </main>
    </>
  );
}