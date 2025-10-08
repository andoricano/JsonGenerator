import { Dropdown } from "./Dropdown";
import { useStores } from "../../AppProvider";



export default function Nav() {
  const { mainStore } = useStores();

  const menuItems = [
    {
      label: "File",
      items: [
        { label: "New Project", onClick: () => console.log("New Project") },
      
        {
          label: "Save",
          onClick: () => exportJSON(mainStore.scriptToJSON())
        },
        {
          label: "Load",
          onClick: () => console.log("Load"),
        },
        
        {
          label: "Setting",
          onClick: () => console.log("Setting"),
        },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", onClick: () => console.log("Undo") },
        { label: "Redo", onClick: () => console.log("Redo") },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Docs", onClick: () => console.log("Docs") },
        { label: "About", onClick: () => console.log("About") },
      ],
    },
  ];

  return (
    <nav>
      {menuItems.map((menu, idx) => (
        <Dropdown key={idx} label={menu.label} items={menu.items} />
      ))}
    </nav>
  );
}

function exportJSON(data: object, filename = "footer.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}