import { useState } from 'react';
import { setLang, getLang } from './lang/i18n';
import type { Lang } from './lang/i18n';
import Header from './components/header/Header';
import Canvas from './components/main/Canvas';
import { AppProvider } from './AppProvider';
import SideBar from './components/aside/SideBar';

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
                    height: '20%',
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
                    left: '0%',
                    width: '20%',
                    height: '80%',
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                    background: '#ddd',
                }}
            >
                <SideBar
                    onSelect={handleMenuSelect}
                />
            </aside>

            <main
                style={{
                    position: 'fixed',
                    top: '20%',
                    left: sidebarOpen ? '20%' : '0%',
                    width: sidebarOpen ? '80%' : '100%',
                    height: '80%',
                    transition: 'left 0.3s ease, width 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    background:'white'
                }}
            >
                <Canvas />
            </main>
        </AppProvider>
    );
}