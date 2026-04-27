import React, { useMemo } from 'react';
import { useStore } from '../../../../stores/useStore';
import { convertToSaveForm, saveProjectLines } from '../../../../services/local/saveService';


export default function FileStructureSection() {
    const lineItems = useStore((state) => state.lineItems);
    const characterList = useStore((state) => state.characterList);
    const projectName = useStore((state) => state.projectInfo.projectName);

    const jsonString = useMemo(() => {
        const data = convertToSaveForm(lineItems, characterList);
        return JSON.stringify(data, null, 2);
    }, [lineItems, characterList]);

    const handleDownload = () => {
        saveProjectLines(lineItems, characterList, projectName);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2 style={styles.title}>File Structure (JSON)</h2>
                <button
                    style={styles.saveButton}
                    onClick={handleDownload}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#388e3c')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2e7d32')}
                >
                    Download JSON
                </button>
            </header>

            <div style={styles.content}>
                <pre style={styles.jsonViewer}>
                    {jsonString}
                </pre>
            </div>
        </div>
    );
}


const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        padding: '20px',
        boxSizing: 'border-box',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
    },
    title: {
        margin: 0,
        fontSize: '18px',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#2e7d32',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
    },
    content: {
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    jsonViewer: {
        flex: 1,
        backgroundColor: '#000000',
        padding: '20px',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '13px',
        lineHeight: '1.5',
        border: '1px solid #333333',
        fontFamily: 'Consolas, "Courier New", monospace',
        whiteSpace: 'pre-wrap', // 줄바꿈 유지
        margin: 0,
    }
};