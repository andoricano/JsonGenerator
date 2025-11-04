import React, { useState } from 'react';
import { Character, Script, ScriptCharacter } from '../../../../scene';


type ImageSceneSectionProps = {
    script: Script;
    onCharacter: (idx: number) => void;
};
export default function ImageSceneSection(
    { script, onCharacter }: ImageSceneSectionProps
) {
    const [editing, setEditing] = useState(false);

    const handleSave = (idx: number) => {
        onCharacter(idx);
    };

    const imgList: (File | null)[] = script.character.map((char: ScriptCharacter) => {
        const img = char.character.img[char.character.selectedImageIndex];
        return img ?? null;
    });

    return (
        <div
            style={{
                ...styles.container,
                display: 'flex',
                gap: '8px',
                padding: '10px',
            }}
        >
            {editing ? (
                <div>
                    
                </div>
            ) : (
                imgList.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            border: '1px solid #ccc',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            height: '100%',
                        }}
                    >
                        {item ? (
                            <img
                                src={URL.createObjectURL(item)}
                                alt={`character-${index}`}
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        ) : (
                            <span>빈 이미지</span>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export const styles: { [key: string]: React.CSSProperties } = {
    container: {
        backgroundColor: '#7cc0d857',
        left: 20,
        right: 20,
        bottom: 20,
        height: '400px',
        boxSizing: 'border-box',
        cursor: 'pointer',
    },
    bubble: {
        padding: '12px',
        marginBottom: '10px',
        borderRadius: '12px',
        display: 'block',
        maxWidth: '80%',
    },
};