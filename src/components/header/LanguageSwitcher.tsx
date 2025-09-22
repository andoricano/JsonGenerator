import React from 'react';
import type { Lang } from '../../lang/i18n';

type Props = {
    lang: Lang;
    onChange: (lang: Lang) => void;
};

export default function LanguageSwitcher({ lang, onChange }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value as Lang);
    };

    const label = lang === 'ko' ? 'Language' : '언어';

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                color: '#333',
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                backgroundColor: '#f9f9f9',
                minWidth: '200px',
                justifyContent: 'space-between',
            }}
        >
            <span>{label}</span>
            <select
                value={lang}
                onChange={handleChange}
                style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                }}
            >
                <option value="ko">한국어</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}