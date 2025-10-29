import React, { useState } from 'react';
import { Script } from '../../../../../../scene';

type TextBoxEditingCharacterProps = {
    scriptString: Script;
    onSave: (newScript: string) => void;
    onCancel: () => void;
};

export default function TextBoxChracterEditing(
    {
        scriptString,
        onSave,
        onCancel
    }: TextBoxEditingCharacterProps
) {

    const scriptCharacter = scriptString?.character ?? [];
    const firstCharacter = scriptCharacter[0]?.character;
    const characterName = firstCharacter?.name ?? "Unknown";


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
                {scriptCharacter[0].character.name}
            </p>
        </div>
    );
}