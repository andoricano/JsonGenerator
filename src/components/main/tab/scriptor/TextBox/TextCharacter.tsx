import { useAppStore } from "../../../../../AppProvider";

export default function TextChracter() {
  const { scriptItems, selectedIndex } = useAppStore();

  // 안전하게 현재 아이템 가져오기
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
        {scriptCharacter.name}
      </p>
    </div>
  );
}