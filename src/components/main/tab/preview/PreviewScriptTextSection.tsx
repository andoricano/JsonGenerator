import React from 'react';

export interface LineActor {
    id: string;
    characterId: string;
    characterImageIdx: number;
    actorState: number;
    actorEffect: string;
}

export interface LineItem {
    id: string;
    actors: LineActor[];
    speakers: string[];
    text: string;
    effect: string;
}

interface PreviewScriptTextSectionProps {
    currentLine: LineItem | null;
}


export default function PreviewScriptTextSection({ currentLine }: PreviewScriptTextSectionProps) {
    const speakerText = currentLine?.speakers?.length ? currentLine.speakers.join(', ') : null;

    return (
        <div style={styles.container}>
            {speakerText && (
                <div style={styles.speakerWrapper}>
                    <span style={styles.speakerName}>{speakerText}</span>
                </div>
            )}
            <div style={styles.textWrapper}>
                <p style={styles.textLine}>{currentLine?.text}</p>
            </div>
        </div>
    );
}



const styles: Record<string, React.CSSProperties> = {
    container: {
        width: '100%',
        height: '180px',
        backgroundColor: 'rgba(45, 45, 45, 0.8)',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        userSelect: 'none',
        pointerEvents: 'none',
    },
    speakerWrapper: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        paddingBottom: '5px',
    },
    speakerName: {
        color: '#ffffff',
        fontSize: '20px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
    },
    textWrapper: {
        flex: 1,
        overflow: 'hidden',
    },
    textLine: {
        color: '#ffffff',
        fontSize: '18px',
        lineHeight: '1.6',
        margin: 0,
        whiteSpace: 'pre-wrap',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
    },
};