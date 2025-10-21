import { useState } from "react";
import { useAppStore } from "../../AppProvider";
import Dialog from "../Dialog";
import Toolbar from "./Toolbar";
import Workspace from "../main/Workspace";

export default function Header() {
  const { projectName, setProjectName } = useAppStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = (newName: string) => {
    setProjectName(newName.trim());
    setDialogOpen(false);
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          minHeight: "60px",
          padding: "12px 24px",
          backgroundColor: "skyblue",
          borderBottom: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            margin: 0,
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: 600,
            color: "#333",
            transition: "color 0.2s ease",
          }}
          onClick={() => setDialogOpen(true)}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
        >
          Project : {projectName}
        </h1>

        <Toolbar />
      </header>
      <Workspace />

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