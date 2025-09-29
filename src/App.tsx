import React, { useState } from 'react';
import { useStores } from './AppProvider';
import { setLang, getLang } from './lang/i18n';
import type { Lang } from './lang/i18n';
import LanguageSwitcher from './components/header/LanguageSwitcher';
import Header from './components/header/Header';
import FooterInput from './components/main/scriptor/InputSection';
import Sidebar from './components/Sidebar';
import SceneCanvas from './components/main/scriptor/Scriptor';
import { AppProvider } from './AppProvider';
import Canvas from './components/main/Canvas'

export default function App() {
    const [lang, setLangState] = useState<Lang>(getLang());
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLangChange = (newLang: Lang) => {
        setLang(newLang);
        setLangState(newLang);
    };

    const handleMenuSelect = (menu: string) => {
        console.log('선택된 메뉴:', menu);
    };

    return (

        <AppProvider>
            <div className="app-container" style={{ display: 'flex', height: '100vh' }}>
                <Header />
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
                        height: '100%',
                    }}
                >
                    <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
                        <LanguageSwitcher lang={lang} onChange={handleLangChange} />
                    </div>
                    <Canvas/>
                </div>
            </div>
        </AppProvider>
    );
}