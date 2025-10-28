import { useState } from "react";

interface TextBoxSelectorProps {
    characterList: string[];
    onSelect: (character: string) => void;
}

export default function TextBoxSelector({
    characterList,
    onSelect,
}: TextBoxSelectorProps) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div>
            {characterList.map((character, index) => (
                <div
                    key={index}
                    style={{
                        margin: "5px",
                        borderBottom: "1px solid #ccc",
                        cursor: "pointer",
                        backgroundColor: selected === character ? "#e0e0e0" : "transparent",
                    }}
                    onClick={() => {
                        setSelected(character);
                        onSelect(character);
                    }}
                >
                    <p style={{ paddingLeft: "15px" }}>{character}</p>
                </div>
            ))}
        </div>
    );
}