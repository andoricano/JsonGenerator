import React, { useState } from 'react';
import { Script } from '../../../../../../scene';

type TextBoxEditingScriptProps = {
    scriptString: Script;
    onSave: (newScript: string) => void;
    onCancel: () => void;
};

export default function TextBoxEditingScript({
    scriptString,
    onSave,
    onCancel,
}: TextBoxEditingScriptProps) {
    const [inputValue, setInputValue] = useState(scriptString.text);
    const [isComposing, setIsComposing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSave = () => {
        if (!inputValue.trim()) return;
        onSave(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isComposing) {
            e.preventDefault();
            handleSave();
        }
    };
    
    return (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                padding: '8px',
                borderTop: '1px solid #ccc',
                backgroundColor: '#fff',
                marginBottom: '10px',
            }}
        >
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                autoFocus
                style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                onClick={handleSave}
                style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    cursor: 'pointer',
                }}
            >
                Save
            </button>
            <button
                onClick={onCancel}
                style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#ccc',
                    color: '#000',
                    cursor: 'pointer',
                }}
            >
                Cancel
            </button>
        </div>
    );
}