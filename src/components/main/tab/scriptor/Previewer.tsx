import React, { useState } from 'react';
import ImageSceneSection from './ImageSceneSection';
import TextBoxSection from './TextBoxSection';
import Slidebar from '../../../aside/SlideBar';
import SideScriptBar from '../../../aside/SideScriptBar';

export default function Previewer() {
    const [isSlideOpen, setIsSlideOpen] = useState(false);

    return (
        <div style={styles.container}>
            <aside style={{
                ...styles.inspectorWrapper,
                flex: isSlideOpen ? 25 : 0,
                minWidth: isSlideOpen ? "300px" : "0px",
                borderRight: isSlideOpen ? "1px solid #ddd" : "none",
                transition: "all 0.3s ease-in-out",
                overflow: "hidden"
            }}>
                {/* Slidebar 안에 SideScriptBar를 넣어서 사용 */}
                <Slidebar isOpen={isSlideOpen} setIsOpen={setIsSlideOpen}>
                    <SideScriptBar />
                </Slidebar>
            </aside>

            <div style={{
                ...styles.canvasContainer,
                flex: isSlideOpen ? 75 : 100,
                transition: "flex 0.3s ease-in-out"
            }}>
                {!isSlideOpen && (
                    <div
                        onMouseEnter={() => setIsSlideOpen(true)}
                        style={styles.hoverTrigger}
                    />
                )}
                <ImageSceneSection />
                <TextBoxSection />
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    inspectorWrapper: {
        flex: 25,
        borderRight: '1px solid #ddd',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',
    },
    canvasContainer: {
        display: 'flex',
        flex: 75,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'black',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
    },
};