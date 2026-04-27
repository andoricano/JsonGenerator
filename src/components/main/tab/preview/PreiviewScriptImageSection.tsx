import React from 'react';
import { useStore, useCurrentLine } from '../../../../stores/useStore';
import { Character, LineItem } from '../../../../stores/canvasType';

interface PreviewScriptImageSectionProps {
    currentLine: LineItem | null;
    characterList: Character[];
}

export default function PreviewScriptImageSection({ currentLine, characterList }: PreviewScriptImageSectionProps) {
    // 라인 데이터가 없거나 액터 배열이 비어있으면 렌더링하지 않음
    if (!currentLine || !currentLine.actors || currentLine.actors.length === 0) return null;

    return (
        <div style={styles.container}>
            {currentLine.actors.map((actor) => {
                const char = characterList.find((c) => c.id === actor.characterId);
                const imageUrl = char?.previewUrls[actor.characterImageIdx];

                // 이미지가 없는 액터는 공간을 차지하지 않도록 처리
                if (!imageUrl) return null;

                return (
                    <div key={actor.id} style={styles.imageWrapper}>
                        <img
                            src={imageUrl}
                            alt={char?.name}
                            style={styles.character}
                            draggable={false}
                        />
                    </div>
                );
            })}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'relative',
        height: '400px',
        boxSizing: 'border-box',
        padding: '20px',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        // 사용자 인터랙션 차단
        userSelect: 'none',
        pointerEvents: 'none',
    },
    imageWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    character: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        cursor: 'default',
        // 모바일 등에서 길게 눌러 저장 방지
        WebkitTouchCallout: 'none',
    },
};