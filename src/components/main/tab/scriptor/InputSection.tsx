import React, { useState,useRef } from 'react';
import { t } from '../../../../lang/i18n';
import { useAppStore } from "../../../../AppProvider";

type Props = {
    onSend: (msg: string) => void;
};

export default function InputSection({ onSend }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const { addScriptItem } = useAppStore();
    const aRef = useRef(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSend = () => {
        aRef.current++;
        if (!inputValue.trim()) return;
        addScriptItem({
            id: Date.now(),
            name: aRef.current % 2 === 0 ? "player" : "luna",
            type: "text",
            cmd1: 0,
            cmd2: 0,
            text: inputValue,
        });
        onSend(inputValue);
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isComposing) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <section
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
        </section>
    );
}