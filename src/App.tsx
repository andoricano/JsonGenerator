import Header from './components/header/Header';
import Canvas from './components/main/Canvas';
import { useStore } from './stores/useStore';
import { useEffect } from 'react';

export default function App() {
    const topRatio = 15;
    const heightRatio = 100 - topRatio;

    return (
        <>
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
        </>
    );
}

function Initializer() {
    const characterList = useStore((state) => state.characterList);
    const initDefaultCharacterImages = useStore((state) => state.initDefaultCharacterImages);

    useEffect(() => {
        initDefaultCharacterImages();
    }, [initDefaultCharacterImages]);

    useEffect(() => {
        if (characterList.length > 0) {
            console.log("캐릭터 리스트 초기화 완료:", characterList);
        }
    }, [characterList]);

    return null;
}