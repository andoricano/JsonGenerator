import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Character, LineActor } from "../../../../../stores/canvasType";

type TextBoxEditingCharacterProps = {
  characterList: Character[];
  selectedActors: LineActor[];
  onChanging: (newLineActors: LineActor[]) => void;
  onCancel: () => void;
};

export default function TextBoxChracterEditing({
  characterList,
  selectedActors,
  onChanging,
}: TextBoxEditingCharacterProps) {
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);


  useEffect(() => {
    if (characterList && selectedActors) {
      const initial = characterList.filter((char) =>
        selectedActors.some((actor) => actor.characterId === char.id)
      );
      setSelectedCharacters(initial);
    }
  }, []);


  const handleToggle = (character: Character) => {
    const isAlreadyChecked = selectedCharacters.some((c) => c.id === character.id);
    const updatedCharacters = isAlreadyChecked
      ? selectedCharacters.filter((c) => c.id !== character.id)
      : [...selectedCharacters, character];

    setSelectedCharacters(updatedCharacters);

    onChanging(
      updatedCharacters.map((ch) => {
        const existingActor = selectedActors.find(a => a.characterId === ch.id);
        return existingActor || {
          id: nanoid(),
          characterId: ch.id,
          characterImageIdx: 0,
          actorText: "",
          actorState: 0,
          actorEffect: "",
        };
      })
    );
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