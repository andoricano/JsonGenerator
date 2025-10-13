import React, { useState } from 'react';
import { t } from '../../../../../lang/i18n';
import { useAppStore } from "../../../../../AppProvider";
import { ScriptString } from '../../../../../types';


export default function InputSection() {

    const { scriptItems, selectedIndex, setScriptItems } = useAppStore();


    const onUpdateScriptString = (newScriptString: ScriptString) => {
        setScriptItems(prev =>
            prev.map((item, idx) =>
                idx === selectedIndex ? { ...item, scriptString: newScriptString } : item
            )
        );
    };
    const [inputValue, setInputValue] = useState('');
    const [isComposing, setIsComposing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        onUpdateScriptString({
            ...scriptItems[selectedIndex].scriptString, 
            script: inputValue,                        
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isComposing) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div
            className="footer-input"
            style={{
                display: 'flex',
                gap: '8px',
                padding: '8px',
                borderTop: '1px solid #ccc',
                backgroundColor: '#fff',
                marginBottom: '10px'
            }}
        >
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                placeholder={t('placeholder')}
                style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                onClick={handleSend}
                style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    cursor: 'pointer',
                }}
            >
                {t('send')}
            </button>
        </div>
    );
}