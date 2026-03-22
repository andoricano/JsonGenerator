import React, { useState } from 'react';
// 1. 타입을 storeType에서 가져오도록 수정
import { Script } from '../../../../../../stores/storeType';

type TextBoxEditingScriptProps = {
    scriptString: Script;
    onInputChange: (s: string) => void;
    onSave: () => void;
};

export default function TextBoxEditingScript({
    scriptString,
    onInputChange,
    onSave,
}: TextBoxEditingScriptProps) {
    const [inputValue, setInputValue] = useState(scriptString.text);
    const [isComposing, setIsComposing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onInputChange(newValue);
    };

    const handleSave = () => {
        onSave();
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
                placeholder="대사를 입력하세요..."
                style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    outline: 'none',
                }}
            />
        </div>
    );
}