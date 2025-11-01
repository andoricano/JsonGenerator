import React, { useState } from "react";
import { Character, ScriptCharacter } from "../../../../../../scene";

type TextBoxEditingCharacterProps = {
  characterList: Character[];
  onSave: (newScriptCharacter: ScriptCharacter[]) => void;
  onCancel: () => void;
};

export default function TextBoxChracterEditing({
  characterList,
  onSave,
}: TextBoxEditingCharacterProps) {
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);

  const handleToggle = (character: Character) => {
    setSelectedCharacters((prev) =>
      prev.some((c) => c.name === character.name)
        ? prev.filter((c) => c.name !== character.name)
        : [...prev, character]
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.checkboxContainer}>
        {characterList.map((character, index) => {
          const isChecked = selectedCharacters.some((c) => c.name === character.name);
          return (
            <label
              key={index}
              style={{
                ...styles.label,
                backgroundColor: isChecked ? "#d0ebff" : "#f5f5f5",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d0ebff")}
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = isChecked ? "#d0ebff" : "#f5f5f5")
              }
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(character)}
                style={styles.input}
              />
              {character.name}
            </label>
          );
        })}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    margin: 5,
    borderBottom: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "8px 10px",
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    userSelect: "none",
    transition: "background 0.2s, transform 0.1s",
  },
  input: {
    cursor: "pointer",
  },
  
};