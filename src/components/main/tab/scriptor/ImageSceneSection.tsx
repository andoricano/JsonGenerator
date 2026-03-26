import React, { useState } from 'react';
import Gallery from '../../../component/Gallery';
import { Character, LineActor, LineItem } from '../../../../stores/canvasType';
import { useStore } from '../../../../stores/useStore';
import { AppState } from '../../../../stores/storeType';

type ImageSceneSectionProps = {
    script: LineItem;
    onCharacter: (updatedActors: LineActor[]) => void;
};

export default function ImageSceneSection({ script, onCharacter }: ImageSceneSectionProps) {
    // 어떤 액터를 편집 중인지 ID로 관리합니다 (null이면 갤러리 닫힘)
    const [editingActorId, setEditingActorId] = useState<string | null>(null);

    const characterList = useStore((state: AppState) => state.characterList);

    // 현재 편집 중인 액터와 그 캐릭터 데이터를 찾아옵니다.
    const currentActor = script.actors.find(a => a.id === editingActorId);
    const currentChar = characterList.find(c => c.id === currentActor?.characterId);

    const handleImageSelect = (index: number) => {
        if (!editingActorId) return;

        // 선택한 인덱스로 해당 액터의 이미지 정보만 교체
        const updatedActors = script.actors.map((actor) =>
            actor.id === editingActorId
                ? { ...actor, characterImageIdx: index }
                : actor
        );

        onCharacter(updatedActors);
        setEditingActorId(null);
    };

    return (
        <div style={{ ...styles.container, display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {/* 갤러리: 선택된 캐릭터의 전체 미리보기 URL 리스트를 넘깁니다 */}
            {editingActorId && currentChar && (
                <Gallery
                    images={currentChar.previewUrls}
                    onSelecting={handleImageSelect}
                    onCancel={() => setEditingActorId(null)}
                />
            )}

            {script.actors.length > 0 ? (
                script.actors.map((actor: LineActor) => {
                    const char = characterList.find((c: Character) => c.id === actor.characterId);
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