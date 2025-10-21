import { useAppStore } from "../../../../../AppProvider";

export default function TextChracter() {
  const { scriptItems, selectedIndex } = useAppStore();

  const scriptCharacter = scriptItems[selectedIndex]?.character ?? { name: "Unknown" };

  return (
    <div
      style={{
        margin: "5px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <p
        style={{
          paddingLeft: "15px",
        }}
      >
        {scriptCharacter[0].name}
      </p>
    </div>
  );
}