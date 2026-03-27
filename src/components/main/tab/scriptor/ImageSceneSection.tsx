import React, { useState } from 'react';
import Gallery from '../../../component/Gallery';
import { useStore, useCurrentLine } from '../../../../stores/useStore';

export default function ImageSceneSection() {
    const currentLine = useCurrentLine();
    const characterList = useStore((state) => state.characterList);
    const updateActorProperty = useStore((state) => state.updateActorProperty);
    const [editingActorId, setEditingActorId] = useState<string | null>(null);
    if (!currentLine) return null;

    const currentActor = currentLine.actors.find(a => a.id === editingActorId);
    const currentChar = characterList.find(c => c.id === currentActor?.characterId);

    const handleImageSelect = (index: number) => {
        if (!editingActorId) return;
        updateActorProperty(currentLine.id, editingActorId, {
            characterImageIdx: index
        });

        setEditingActorId(null);
    };

    return (
        <div style={{ ...styles.container, display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {editingActorId && currentChar && (
                <Gallery
                    images={currentChar.previewUrls}
                    onSelecting={handleImageSelect}
                    onCancel={() => setEditingActorId(null)}
                />
            )}

            {currentLine.actors.length > 0 ? (
                currentLine.actors.map((actor) => {
                    const char = characterList.find((c) => c.id === actor.characterId);
                    const imageUrl = char?.previewUrls[actor.characterImageIdx];

                    return (
                        <div key={actor.id} style={styles.imageWrapper}>
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={char?.name}
                                    style={styles.character}
                                    onClick={() => setEditingActorId(actor.id)}
                                />
                            ) : (
                                <div
                                    style={styles.emptyState}
                                    onClick={() => setEditingActorId(actor.id)}
                                >
                                    이미지 설정 필요
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div style={styles.emptyState}>
                    <span style={{ color: '#999' }}>액터가 없습니다.</span>
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
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