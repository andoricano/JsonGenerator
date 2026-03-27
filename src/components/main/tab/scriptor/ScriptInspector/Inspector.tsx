import { nanoid } from 'nanoid'; // nanoid 임포트 확인
import React from 'react';
import { LineActor } from '../../../../../stores/canvasType'; // 경로 확인
import { useStore, useCurrentLine } from '../../../../../stores/useStore';
import { SpeakerSection } from './SpeakerSection';
import { ExpressionSection } from './ExpressionSection';
import { DialogueSection } from './DialogueSection';



export default function Inspector() {
    const currentLine = useCurrentLine();
    const characterList = useStore((state) => state.characterList);
    const updateLineText = useStore((state) => state.updateLineText);
    const updateLineActors = useStore((state) => state.updateLineActors);

    if (!currentLine) {
        return <EmptyState message="수정할 라인을 왼쪽에서 선택해주세요." />;
    }

    const selectedIds = currentLine.actors.map(actor => actor.characterId);

    const firstActor = currentLine.actors[0];
    const currentChar = characterList.find(c => c.id === firstActor?.characterId);


    const handleMultiCharChange = (newIds: string[]) => {
        const selectedChars = characterList.filter(c => newIds.includes(c.id));

        const newActors: LineActor[] = selectedChars.map(ch => {
            const existingActor = currentLine.actors.find(a => a.characterId === ch.id);

            return existingActor || {
                id: nanoid(),
                characterId: ch.id,
                characterImageIdx: 0,
                actorText: "",
                actorState: 0,
                actorEffect: "",
            };
        });

        const speakerNames = selectedChars.map(c => {
            const target = characterList.find(char => char.id === c.id);
            return target?.name || "알 수 없음";
        });

        updateLineActors(currentLine.id, newActors, speakerNames);
    };


    const handleIdxChange = (actorId: string, idx: number) => {
        const newActors = currentLine.actors.map(actor =>
            actor.id === actorId ? { ...actor, characterImageIdx: idx } : actor
        );
        updateLineActors(currentLine.id, newActors, currentLine.speakers);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>SCRIPT INSPECTOR</div>

            <div style={styles.content}>
                {/* 📍 3. Props 이름과 값을 다중 선택용으로 교체 */}
                <SpeakerSection
                    selectedIds={selectedIds} // currentId 대신 selectedIds
                    list={characterList}
                    onChange={handleMultiCharChange} // handleMultiCharChange 연결
                />

                <ExpressionSection
                    actors={currentLine.actors}
                    characterList={characterList}
                    onChange={handleIdxChange}
                />


                <hr style={styles.divider} />

                <DialogueSection
                    text={currentLine.text}
                    onChange={(val) => updateLineText(currentLine.id, val)}
                />

                <div style={styles.metaSection}>
                    <div style={styles.metaInfo}>Line ID: {currentLine.id.slice(0, 8)}...</div>
                </div>
            </div>
        </div>
    );
}



// Inspector 내부에서만 쓰는 EmptyState와 styles는 그대로 유지하거나 별도로 관리
function EmptyState({ message }: { message: string }) {
    return (
        <div style={styles.container}>
            <div style={styles.header}>SCRIPT INSPECTOR</div>
            <div style={{ ...styles.content, ...styles.emptyState }}>{message}</div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { width: "100%", height: "100%", backgroundColor: "#fff", display: "flex", flexDirection: "column", borderLeft: "1px solid #ddd" },
    header: { padding: "12px", backgroundColor: "#333", color: "#fff", fontSize: "11px", fontWeight: "bold", letterSpacing: "1px" },
    content: { flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "24px", overflowY: "auto" },
    divider: { width: "100%", border: "none", borderTop: "1px solid #eee", margin: "4px 0" },
    metaSection: { marginTop: "auto", paddingTop: "10px" },
    metaInfo: { fontSize: "10px", color: "#ccc", textAlign: "right" },
    emptyState: { justifyContent: "center", alignItems: "center", textAlign: "center", color: "#999" }
};