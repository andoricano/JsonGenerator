import React from 'react';
import { useStore } from "../../stores/useStore";
import { TOOLS } from "../../stores/storeType";
import Scriptor from "./tab/scriptor/Scriptor";
import Previewer from "./tab/scriptor/Previewer";
import Character from "./tab/character/Character";
import SideBar from "../aside/SideBar";
import Config from './tab/config/Config';
import Project from './tab/project/Project';
// Canvas.tsx
export default function Canvas() {
  const activeTool = useStore((state) => state.activeTool);
  const showSideBar =
    activeTool === TOOLS.SCRIPTOR ||
    activeTool === TOOLS.STRUCTURE ||
    activeTool === TOOLS.CHARACTER;

  return (
    <div style={styles.canvas}>
      {showSideBar && (
        <aside style={styles.aside}>
          <SideBar />
        </aside>
      )}
      {/* 워크스페이스 영역만 별도로 스크롤 발생 */}
      <div style={styles.workspace}>
        {activeTool === TOOLS.PROJECT && <Project />}
        {activeTool === TOOLS.SCRIPTOR && <Scriptor />}
        {activeTool === TOOLS.CHARACTER && <Character />}
        {activeTool === TOOLS.PREVIEW && <Previewer />}
        {activeTool === TOOLS.STRUCTURE && <Config />}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  canvas: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  aside: {
    width: "260px",
    height: "100%",
    flexShrink: 0,
    borderRight: "1px solid #eee",
    backgroundColor: "#fff",
    overflowY: "auto",
  },
  workspace: {
    flex: 1,
    height: "100%",
    overflowY: "auto",
    backgroundColor: "#fafafa",
  },
};