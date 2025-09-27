// import { Lang } from "../../stores/HeaderStore";
// import LanguageSwitcher from "./LanguageSwitcher";
import { useObservable } from "../../hooks/useObservable";
import { useStores } from "../../AppProvider";
import Nav from "./Nav";
import { useState } from "react";
import Dialog from "../Dialog";
import Workspace from "./Workspace";



export default function Header() {
  const { headerStore } = useStores();
  const projectName = useObservable(headerStore.projectName$, headerStore.projectName);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = (newName: string) => {
    headerStore.setProjectName(newName);
    setDialogOpen(false);
  };
  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "160px",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid #ccc",
          background: "skyblue",
          zIndex: 1000,
        }}
      >
        <h1>
          <span style={{ cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
            Project : {projectName}
          </span>
        </h1>
        <Nav />
        <Workspace/>
      </header>

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