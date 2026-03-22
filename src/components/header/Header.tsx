import Toolbar from "./Toolbar";
import Workspace from "../main/Workspace";
import { useStore } from "../../stores/useStore";

export default function Header() {
  const projectName = useStore((state) => state.projectInfo.projectName);

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
            fontSize: "20px",
            fontWeight: 600,
            color: "#333",
          }}
        >
          {projectName}
        </h1>

        <Toolbar />
      </header>
      <Workspace />

    </>
  );
}