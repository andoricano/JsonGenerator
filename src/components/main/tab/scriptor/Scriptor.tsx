import ImageSceneSection from './ImageSceneSection';
import TextBoxSection from './TextBoxSection';
import Inspector from './ScriptInspector/Inspector';

export default function Scriptor() {
    return (
        <div style={styles.container}>
            <div style={styles.canvasContainer}>
                <ImageSceneSection />
                <TextBoxSection />
            </div>

            <div style={styles.inspectorWrapper}>
                <Inspector />
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
    inspectorWrapper: {
        flex: 25,
        borderLeft: '1px solid #ddd',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '250px',
    },
};