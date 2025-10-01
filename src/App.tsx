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
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '10%',
                    background: '#f5f5f5',
                    zIndex: 1000,
                }}
            >
                <Header />
            </header>

            <aside
                style={{
                    position: 'fixed',
                    top: '10%',            
                    left: 0,
                    width: sidebarOpen ? '10%' : '0%',
                    height: '90%',          
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                    background: '#ddd',
                    zIndex: 900,
                }}
            >
                <Sidebar
                    onSelect={handleMenuSelect}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
            </aside>

            <main
                style={{
                    position: 'fixed',
                    top: '10%',
                    left: sidebarOpen ? '14%' : '0%',
                    width: sidebarOpen ? '80%' : '100%',
                    height: '90%',
                    transition: 'left 0.3s ease, width 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    background: '#fff',
                }}
            >
                <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                    <LanguageSwitcher lang={lang} onChange={handleLangChange} />
                </div>
                <Canvas />
            </main>
        </AppProvider>
    );
}