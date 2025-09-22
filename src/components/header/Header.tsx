import { Lang } from "../../stores/HeaderStore";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
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
      <h1>test</h1>
      {/* <LanguageSwitcher
        lang={lang}
        onChange={(l) => headerStore.setLang(l)}  
      /> */}
    </header>
  );
}