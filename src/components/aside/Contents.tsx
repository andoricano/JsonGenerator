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
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ul
        style={{
          flex: 1,
          margin: 0,
          padding: '8px 0',
          listStyle: 'none',
          overflowY: 'auto',
        }}
      >
        {categories[activeCategory].map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}