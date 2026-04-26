import React from 'react';

interface ArrowControllerProps {
    onPrev: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export default function ArrowController({ onPrev, onNext, isFirst, isLast }: ArrowControllerProps) {
    return (
        <div style={styles.overlay}>
            {!isFirst && (
                <button onClick={onPrev} style={{ ...styles.button, left: '20px' }}>
                    {"<"}
                </button>
            )}
            {!isLast && (
                <button onClick={onNext} style={{ ...styles.button, right: '20px' }}>
                    {">"}
                </button>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
    },
    button: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'auto',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        color: '#333333',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold'
    }
};