import React, { useState } from 'react';
import Gallery from '../../../component/Gallery';
import { Character, LineActor, LineItem } from '../../../../stores/canvasType';
import { useStore } from '../../../../stores/useStore';
import { AppState } from '../../../../stores/storeType'; // AppState 임포트 확인

type ImageSceneSectionProps = {
    script: LineItem;
    onCharacter: (updatedActors: LineActor[]) => void;
};

export default function ImageSceneSection({ script, onCharacter }: ImageSceneSectionProps) {
    const [editing, setEditing] = useState(false);

    // 1. 구조 분해 할당 대신 Selector를 사용하여 에러 방지
    const characterList = useStore((state: AppState) => state.characterList);

    const imgList: File[] = script.actors
        .map((actor: LineActor) => {
            const char = characterList.find((c: Character) => c.id === actor.characterId);
            if (!char || !char.img[actor.characterImageIdx]) return null;
            return char.img[actor.characterImageIdx];
        })
        .filter((img): img is File => img !== null);

    const handleImageSelect = (selectedFile: File) => {
        const updatedActors = script.actors.map((actor) => {
            const char = characterList.find((c: Character) => c.id === actor.characterId);
            if (!char) return actor;

            const nextIdx = char.img.findIndex((f) => f === selectedFile);

            return nextIdx !== -1
                ? { ...actor, characterImageIdx: nextIdx }
                : actor;
        });

        onCharacter(updatedActors);
        setEditing(false);
    };

    return (
        <div style={{ ...styles.container, display: 'flex', gap: '8px' }}>
            {editing && (
                <Gallery
                    images={imgList}
                    onSelecting={handleImageSelect}
                    onCancel={() => setEditing(false)}
                />
            )}

            {imgList.length > 0 ? (
                imgList.map((item: File, index: number) => (
                    <div key={`${index}-${item.name}`} style={styles.imageWrapper}>
                        <img
                            src={URL.createObjectURL(item)}
                            alt={`character-${index}`}
                            style={styles.character}
                            onClick={() => setEditing(true)}
                        />
                    </div>
                ))
            ) : (
                <div style={styles.emptyState}>
                    <span onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
                        캐릭터 이미지를 클릭하여 편집하세요
                    </span>
                </div>
            )}
        </div>
    );
}

// 2. 누락된 스타일 속성 추가 및 정의
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
    },
    imageWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#666',
        border: '1px dashed #ccc',
    }
};