import React, { useRef, useState } from 'react';
import ImageSceneSection from './ImageSceneSection';
import TextBoxSection from './TextBoxSection';
import Slidebar from '../../../aside/SlideBar';
import SideScriptBar from '../../../aside/SideScriptBar';
import ArrowController from './preview/ArrowController';
import { useCurrentLine, useStore } from '../../../../stores/useStore';

export default function Previewer() {
    const [isSlideOpen, setIsSlideOpen] = useState(true);

    const lineItems = useStore((state) => state.lineItems);
    const selectedLineIndex = useStore((state) => state.selectedLineIndex);
    const setSelectedIndex = useStore((state) => state.setSelectedIndex);

    // 현재 라인 데이터 가져오기 (커스텀 훅 호출)
    const currentLine = useCurrentLine();

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
                <ArrowController
                    onPrev={handlePrev}
                    onNext={handleNext}
                    isFirst={selectedLineIndex === 0}
                    isLast={selectedLineIndex === lineItems.length - 1}
                />
                {/* <ImageSceneSection />
                <TextBoxSection /> */}
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