import Header from './components/header/Header';
import Canvas from './components/main/Canvas';
import { AppProvider } from './AppProvider';
import SideBar from './components/aside/SideBar';

export default function App() {
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
                    right: 0,
                    height: '15%',
                    background: '#f5f5f5',
                    zIndex: 1000,
                }}
            >
                <Header />
            </header>

            <aside
                style={{
                    position: 'fixed',
                    top: '15%',
                    left: '0%',
                    width: '20%',
                    height: '85%',
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
                    top: '15%',
                    left: '20%',
                    width: '80%',
                    height: '85%',
                    minWidth: '500px',
                    minHeight: '500px',
                    transition: 'left 0.3s ease, width 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white'
                }}
            >
                <Canvas />
            </main>
        </AppProvider>
    );
}