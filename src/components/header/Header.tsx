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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          minWidth: '1000px',
          minHeight: '160px',
          height: "160px",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid #ccc",
          background: "white",
          zIndex: 1000,
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginTop: "20px",
            padding: "12px 20px",
            background: "lightblue",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              margin: 0,
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#333",
              padding: "10px 16px",
              borderRadius: "6px",
              transition: "background 0.2s, color 0.2s",
            }}
            onClick={() => setDialogOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e0f0ff";
              e.currentTarget.style.color = "#007bff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#333";
            }}
          >
            Project : {projectName}
          </h1>
          <Nav />
        </div>
        <Workspace />
      </div>

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