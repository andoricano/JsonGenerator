import Header from './components/header/Header';
import Canvas from './components/main/Canvas';
import { AppProvider } from './AppProvider';

export default function App() {
    return (
        <AppProvider>
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '20%',
                    background: '#f5f5f5',
                    zIndex: 1000,
                }}
            >
                <Header />
            </header>
            <main
                style={{
                    position: 'fixed',
                    top: '20%',
                    width: '100%',
                    height: '80%',
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