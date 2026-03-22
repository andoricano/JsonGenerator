import React, { useState } from 'react';

import { Script, ScriptCharacter } from '../../../../stores/storeType';
import Gallery from '../../../component/Gallery';

type ImageSceneSectionProps = {
    script: Script;
    onCharacter: (file: File) => void;
};

export default function ImageSceneSection({ script, onCharacter }: ImageSceneSectionProps) {
    const [editing, setEditing] = useState(false);


    const imgList: File[] = script.character
        .map((char: ScriptCharacter) => {
            const img = char.character.img[char.character.selectedImageIndex];
            return img;
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
            {editing && (
                <Gallery
                    images={imgList}
                    onSelecting={(selected) => {
                        onCharacter(selected);
                        setEditing(false);
                    }}
                    onCancel={() => setEditing(false)}
                />
            )}

            {imgList.length > 0 ? (
                imgList.map((item, index) => (
                    <div
                        key={`${index}-${item.name}`}
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <img
                            src={URL.createObjectURL(item)}
                            alt={`character-${index}`}
                            style={styles.character}
                            onClick={() => setEditing(true)}
                        />
                    </div>
                ))
            ) : (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666' }}>
                    <span onClick={() => setEditing(true)}>캐릭터 이미지를 클릭하여 편집하세요</span>
                </div>
            )}
        </div>
    );
}

export const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: 'relative',
        height: '400px',
        boxSizing: 'border-box',
        cursor: 'pointer',
        padding: '20px',
    },
    character: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
    }
};