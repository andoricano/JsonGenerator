import React, { useRef, useState } from 'react';
import TextBoxSection from '../scriptor/TextBoxSection';
import Slidebar from '../../../aside/SlideBar';
import SideScriptBar from '../../../aside/SideScriptBar';
import ArrowController from './ArrowController';
import { useCurrentLine, useStore } from '../../../../stores/useStore';
import PreviewScriptImageSection from './PreiviewScriptImageSection';
import PreviewScriptTextSection from './PreviewScriptTextSection';

export default function Previewer() {
    const [isSlideOpen, setIsSlideOpen] = useState(true);

    const lineItems = useStore((state) => state.lineItems);
    const selectedLineIndex = useStore((state) => state.selectedLineIndex);
    const setSelectedIndex = useStore((state) => state.setSelectedIndex);

    const currentLine = useCurrentLine();
    const characterList = useStore((state) => state.characterList);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePrev = () => {
        if (selectedLineIndex > 0) {
            const nextIndex = selectedLineIndex - 1;
            console.log("이전 라인 이동:", nextIndex);
            setSelectedIndex(nextIndex);
        }
    };

    const handleNext = () => {
        if (selectedLineIndex < lineItems.length - 1) {
            const nextIndex = selectedLineIndex + 1;
            console.log("다음 라인 이동:", nextIndex);
            setSelectedIndex(nextIndex);
        }
    };

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
                <ArrowController
                    onPrev={handlePrev}
                    onNext={handleNext}
                    isFirst={selectedLineIndex === 0}
                    isLast={selectedLineIndex === lineItems.length - 1}
                />

                <PreviewScriptImageSection
                    currentLine={currentLine}
                    characterList={characterList}
                />
                <PreviewScriptTextSection
                    currentLine={currentLine}
                />
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