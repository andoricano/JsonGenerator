import React from 'react';
import { useStore } from "../../stores/useStore";
import { TOOLS } from "../../stores/storeType";
import Scriptor from "./tab/scriptor/Scriptor";
import Character from "./tab/character/Character";
import SideBar from "../aside/SideBar";
import Config from './tab/config/Config';
import Project from './tab/project/Project';

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
      <div style={styles.workspace}>
        {activeTool === TOOLS.PROJECT && <Project />}
        {activeTool === TOOLS.SCRIPTOR && <Scriptor />}
        {activeTool === TOOLS.CHARACTER && <Character />}
        {activeTool === TOOLS.STRUCTURE && <Config />}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  canvas: {
    minWidth: "500px",
    minHeight: "100px",
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  aside: {
    width: "20%",
    height: "100%",
    background: "#ddd",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  workspace: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
  },
};