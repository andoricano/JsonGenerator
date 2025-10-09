import React from "react";
import { useStores } from "../../AppProvider";
import { useObservable } from "../../hooks/useObservable";
import { TOOLS } from "../main/Workspace";

interface ContentsProps {
  obj: Record<string, string[]>;
}

export default function Contents({ obj }: ContentsProps) {
  const { appStore } = useStores();
  const activeTool = useObservable(appStore.activeTool$, appStore.activeTool);

  const categories = {
    Script: obj["Script"] ?? [],
    Character: obj["Character"] ?? [],
    Resource: obj["Resource"] ?? [],
  };

  const TOOL_TO_CATEGORY: Record<string, keyof typeof categories> = {
    [TOOLS.SCRIPTOR]: "Script",
    [TOOLS.CHARACTER]: "Character",
    [TOOLS.EDITER]: "Resource",
  };

  const activeCategory = TOOL_TO_CATEGORY[activeTool] ?? "Script";

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        padding: "8px 0",
      }}
    >
      <ul>
        {categories[activeCategory].map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}