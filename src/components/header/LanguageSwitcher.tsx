import React from 'react';
import { useStore, Lang } from "../../stores/useStore";

export default function LanguageSwitcher() {
    const lang = useStore((state) => state.lang);
    const languages = useStore((state) => state.languages);
    const setLang = useStore((state) => state.setLang);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLang(e.target.value as Lang);
    };

    const label = lang === "ko" ? "Language" : "언어";

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
                width: '160px',
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
                {languages.map((item) => (
                    <option key={item.code} value={item.code}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
}