import React from 'react';
import ImageSceneSection from './ImageSceneSection';
import TextBoxSection from './TextBoxSection';
import Inspector from './ScriptInspector/Inspector';

export default function Scriptor() {
    return (
        <div style={styles.container}>
            <div style={styles.inspectorWrapper}>
                <Inspector />
            </div>

            <div style={styles.canvasContainer}>
                <ImageSceneSection />
                <TextBoxSection />
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    inspectorWrapper: {
        flex: 25,
        borderRight: '1px solid #ddd',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',
    },
    canvasContainer: {
        display: 'flex',
        flex: 75,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'black',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
    },
};