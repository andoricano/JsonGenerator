import React, { useState } from 'react';
import { t } from '../lang/i18n';

type Props = {
    onSend: (msg: string) => void;
};
export default function FooterInput({ onSend }: Props) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
    const handleSend = () => {
        if (!inputValue.trim()) return;
        onSend(inputValue);
        setInputValue('');
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
            }}
        >
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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