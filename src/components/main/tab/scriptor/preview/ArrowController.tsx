import React, { useState } from 'react';

interface ArrowControllerProps {
    onPrev: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export default function ArrowController({ onPrev, onNext, isFirst, isLast }: ArrowControllerProps) {
    const [hovered, setHovered] = useState<string | null>(null);

    const getButtonStyle = (direction: 'left' | 'right') => ({
        ...styles.button,
        [direction]: '20px',
        ...(hovered === direction ? styles.buttonHover : {}),
    });

    return (
        <div style={styles.overlay}>
            {!isFirst && (
                <button
                    onClick={onPrev}
                    onMouseEnter={() => setHovered('left')}
                    onMouseLeave={() => setHovered(null)}
                    style={getButtonStyle('left')}
                >
                    {"<"}
                </button>
            )}
            {!isLast && (
                <button
                    onClick={onNext}
                    onMouseEnter={() => setHovered('right')}
                    onMouseLeave={() => setHovered(null)}
                    style={getButtonStyle('right')}
                >
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
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        userSelect: 'none',
        outline: 'none',
    },
    buttonHover: {
        backgroundColor: '#333333',
        color: '#ffffff',
        borderColor: '#333333',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateY(-50%) scale(1.05)',
    },
};