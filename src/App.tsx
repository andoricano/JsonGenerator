import Header from './components/header/Header';
import Canvas from './components/main/Canvas';
import { AppProvider, useAppStore } from './AppProvider';
import { useEffect } from 'react';

export default function App() {
    const topRatio = 15;
    const heightRatio = 100 - topRatio;

    return (
        <AppProvider>
            <Initializer />
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${topRatio}%`,
                    background: 'skyblue',
                    zIndex: 1000,
                }}
            >
                <Header />
            </header>
            <main
                style={{
                    position: 'fixed',
                    top: `${topRatio}%`,
                    width: '100%',
                    height: `${heightRatio}%`,
                    minWidth: '500px',
                    minHeight: '300px',
                    transition: 'left 0.3s ease, width 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white',
                    overflow: 'auto',
                }}
            >
                <Canvas />
            </main>
        </AppProvider>
    );
}

function Initializer() {
    const { characterList, initDefaultCharacterImages } = useAppStore();

    useEffect(() => {
        initDefaultCharacterImages();
        console.log(characterList)
    }, []);

    return null;
}