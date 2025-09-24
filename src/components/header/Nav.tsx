import { Dropdown } from "./Dropdown";

const menuItems = [
  {
    label: "File",
    items: [
      { label: "New", onClick: () => console.log("New file") },
      { label: "Save", onClick: () => console.log("Save file") },
      { label: "Export", onClick: () => console.log("Export file") },
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

export default function Nav() {
  return (
    <nav style={{ display: "flex", gap: "12px" }}>
      {menuItems.map((menu, idx) => (
        <Dropdown key={idx} label={menu.label} items={menu.items} />
      ))}
    </nav>
  );
}