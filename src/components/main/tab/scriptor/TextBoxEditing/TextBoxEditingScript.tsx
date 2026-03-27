import React, { useState, useEffect } from 'react';

type Props = {
    value: string; // 부모의 script 상태를 직접 받음
    onInputChange: (s: string) => void;
    onSave: () => void;
    onCancel: () => void;
};

export default function TextBoxEditingScript({
    value,
    onInputChange,
    onSave,
    onCancel,
}: Props) {
    const [isComposing, setIsComposing] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isComposing) {
            e.preventDefault();
            onSave();
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={() => setIsComposing(true)}
                    onCompositionEnd={() => setIsComposing(false)}
                    autoFocus
                    placeholder="대사를 입력하세요..."
                    style={styles.input}
                />
            </div>

            {/* ActionBar 로직을 내부로 흡수 */}
            <div style={styles.buttonContainer}>
                <button onClick={onSave} style={styles.buttonSave}>Save</button>
                <button onClick={onCancel} style={styles.buttonCancel}>Cancel</button>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        padding: '12px',
        borderTop: '1px solid #eee',
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box' as const,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
    },
    buttonSave: {
        padding: '6px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonCancel: {
        padding: '6px 16px',
        backgroundColor: '#ccc',
        color: '#333',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};