// import { Lang } from "../../stores/HeaderStore";
// import LanguageSwitcher from "./LanguageSwitcher";
import { Dropdown } from "./Dropdown";


export default function Header() {
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


  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid #ccc",
        background: "skyblue",
        zIndex: 1000,
      }}
    >
      <h1 style={{ marginRight: "auto" }}>Generate Script</h1>
      <nav style={{ display: "flex", gap: "12px" }}>

        {menuItems.map((menu, idx) => (
          <Dropdown key={idx} label={menu.label} items={menu.items} />
        ))}
      </nav>
    </header>
  );
}