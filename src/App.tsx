import React, { useState } from 'react';
import { setLang, getLang } from './lang/i18n';
import type { Lang } from './lang/i18n';
import LanguageSwitcher from './components/LanguageSwitcher';
import FooterInput from './components/FooterInput';
import Sidebar from './components/Sidebar';
import TextBox from './components/TextBox';

export default function App() {
    const [lang, setLangState] = useState<Lang>(getLang());
    const [messages, setMessages] = useState<
        { id: number; sender: 'player'; text: string }[]
    >([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLangChange = (newLang: Lang) => {
        setLang(newLang);
        setLangState(newLang);
    };

    const handleSend = (msg: string) => {
        setMessages(prev => [
            ...prev,
            { id: prev.length + 1, sender: 'player', text: msg },
        ]);
    };
    const latestMessage = messages.length > 0 ? [messages[messages.length - 1]] : [];

    const handleMenuSelect = (menu: string) => {
        console.log('선택된 메뉴:', menu);
    };

    return (

        <div className="app-container" style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                onSelect={handleMenuSelect}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <div
                style={{
                    flex: 1,
                    marginLeft: sidebarOpen ? 200 : 0,
                    transition: 'margin-left 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
                    <LanguageSwitcher lang={lang} onChange={handleLangChange} />
                </div>


                <div style={{ flex: 1, padding: '16px' }}>
                    <TextBox messages={latestMessage} />
                </div>

                <FooterInput onSend={handleSend} />
            </div>
        </div>
    );
}