import React, { useState } from 'react';
import { setLang, getLang } from './lang/i18n';
import type { Lang } from './lang/i18n';
import LanguageSwitcher from './components/LanguageSwitcher';
import FooterInput from './components/FooterInput';

export default function App() {
    const [lang, setLangState] = useState<Lang>(getLang());
    const [messages, setMessages] = useState<string[]>([]);

    const handleLangChange = (newLang: Lang) => {
        setLang(newLang);
        setLangState(newLang);
    };

    const handleSend = (msg: string) => {
        setMessages(prev => [...prev, msg]);
        console.log('App Messages:', msg);
    };

    return (
        <div
            className="app-container"
            style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
            <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
                <LanguageSwitcher lang={lang} onChange={handleLangChange} />
            </div>

            <div style={{ flex: 1, overflow: 'auto' }}>
            </div>

            <FooterInput onSend={handleSend} />
        </div>
    );
}
