import React, { useState } from "react";
import { Character, LineActor } from "../../../../../../stores/canvasType";
import { nanoid } from "nanoid";

type TextBoxEditingCharacterProps = {
  characterList: Character[];
  onChanging: (newLineActors: LineActor[]) => void;
  onCancel: () => void;
};

export default function TextBoxChracterEditing({
  characterList,
  onChanging,
}: TextBoxEditingCharacterProps) {
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);

  const handleToggle = (character: Character) => {
    setSelectedCharacters((prev) => {
      const updated = prev.some((c) => c.id === character.id)
        ? prev.filter((c) => c.id !== character.id)
        : [...prev, character];

      onChanging(
        updated.map((ch) => ({
          id: nanoid(),
          characterId: ch.id,
          characterImageIdx: 0,
          actorText: "",
          actorState: 0,
          actorEffect: "",
        }))
      );

      return updated;
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.checkboxContainer}>
        {characterList.map((character, index) => {
          const isChecked = selectedCharacters.some((c) => c.id === character.id);
          return (
            <label
              key={character.id || index}
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