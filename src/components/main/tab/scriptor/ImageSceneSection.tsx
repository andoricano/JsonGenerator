import React, { useState } from 'react';
import { Character, Script, ScriptCharacter } from '../../../../scene';
import Gallery from '../../../component/Gallery';

type ImageSceneSectionProps = {
    script: Script;
    onCharacter: (file : File) => void;
};
export default function ImageSceneSection(
    { script, onCharacter }: ImageSceneSectionProps
) {
    const [editing, setEditing] = useState(false);

    const handleSave = (file : File) => {
        onCharacter(file);
    };
    
    const imgList: File[] = script.character
        .map((char: ScriptCharacter) => {
            const img = char.character.img[char.character.selectedImageIndex];
            return img; // File | undefined
        })
        .filter((img): img is File => img !== undefined && img !== null);

    return (
        <div
            style={{
                ...styles.container,
                display: 'flex',
                gap: '8px',
            }}
        >

            {editing ? (
                <div>
                    <Gallery
                        images={imgList}
                        onSelecting={(selected) => {
                            console.log("선택된 이미지", selected);
                            setEditing(false);
                        }}
                        onCancel={() => setEditing(false)}
                    />
                </div>
            ) : (
                <div>
                    
                </div>
            )}
            {
                imgList.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        {item ? (
                            <img
                                src={URL.createObjectURL(item)}
                                alt={`character-${index}`}
                                style={styles.character}
                                onClick={() => setEditing(!editing)}
                            />
                        ) : (
                            <span>빈 이미지</span>
                        )}
                    </div>
                ))
            }
        </div>
    );
}

export const styles: { [key: string]: React.CSSProperties } = {
    container: {
        left: 20,
        right: 20,
        bottom: 20,
        height: '400px',
        boxSizing: 'border-box',
        cursor: 'pointer',
    },
    character: {
        maxWidth: '100%',
        maxHeight: '100%'
    }
};