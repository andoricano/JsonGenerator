import React, { useState } from 'react';
import { Character, Script } from '../../../../../../scene';

type TextBoxEditingCharacterProps = {
    characterList: Character[];
    onSave: (newScript: string) => void;
    onCancel: () => void;
};

export default function TextBoxChracterEditing(
    {
        characterList,
        onSave,
        onCancel
    }: TextBoxEditingCharacterProps
) {
    const [selectedCharacter, setSelectedCharacter] = useState(
        characterList[0]?.name ?? "Unknown"
    );

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCharacter(e.target.value);
    };

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation(); // 부모 클릭 이벤트 방지
        onSave(selectedCharacter);
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCancel();
    };

    return (
        <div
            style={{
                margin: "5px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 10px",
            }}
        >
            <select
                value={selectedCharacter}
                onChange={handleChange}
                style={{
                    flex: 1,
                    padding: "6px 8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            >
                {characterList.map((character, index) => (
                    <option key={index} value={character.name}>
                        {character.name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleSave}
                style={{
                    padding: "6px 10px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                Save
            </button>

            <button
                onClick={handleCancel}
                style={{
                    padding: "6px 10px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#ccc",
                    color: "#000",
                    cursor: "pointer",
                }}
            >
                Cancel
            </button>
        </div>
    );
}