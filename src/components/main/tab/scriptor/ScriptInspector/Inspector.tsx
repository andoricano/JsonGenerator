import { nanoid } from 'nanoid'; // nanoid 임포트 확인
import React from 'react';
import { LineActor } from '../../../../../stores/canvasType'; // 경로 확인
import { useStore, useCurrentLine } from '../../../../../stores/useStore';
import { SpeakerSection } from './SpeakerSection';
import { ExpressionSection } from './ExpressionSection';
import { DialogueSection } from './DialogueSection';
import { ActorSection } from './ActorSection';



export default function Inspector() {
    const currentLine = useCurrentLine();
    const characterList = useStore((state) => state.characterList);
    const updateLineActors = useStore((state) => state.updateLineActors);
    const updateLineText = useStore((state) => state.updateLineText);

    if (!currentLine) return <EmptyState message="라인을 선택해주세요." />;

    // 1. 출연진(Actors) 변경 핸들러 (아까 작성한 로직)
    const handleActorToggle = (newIds: string[]) => {
        const selectedChars = characterList.filter(c => newIds.includes(c.id));
        const newActors = selectedChars.map(ch => {
            const existing = currentLine.actors.find(a => a.characterId === ch.id);
            return existing || {
                id: nanoid(),
                characterId: ch.id,
                characterImageIdx: 0,
                actorText: "",
                actorState: 0,
                actorEffect: "",
            };
        });

        // 주의: Actor가 빠지면 Speaker 배열에서도 해당 이름을 지워줘야 안전함
        const activeNames = selectedChars.map(c => c.name);
        const filteredSpeakers = currentLine.speakers.filter(name => activeNames.includes(name));

        updateLineActors(currentLine.id, newActors, filteredSpeakers);
    };

    // 2. 발화자(Speakers) 변경 핸들러
    const handleSpeakerToggle = (newNames: string[]) => {
        updateLineActors(currentLine.id, currentLine.actors, newNames);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>SCRIPT INSPECTOR</div>
            <div style={styles.content}>

                <ActorSection
                    selectedIds={currentLine.actors.map(a => a.characterId)}
                    list={characterList}
                    onChange={handleActorToggle} // 아까 nanoid랑 필수 필드 채운 그 함수
                />

                <SpeakerSection
                    actors={currentLine.actors}
                    characterList={characterList}
                    selectedNames={currentLine.speakers}
                    onChange={handleSpeakerToggle}
                />


                <hr style={styles.divider} />

                <DialogueSection
                    text={currentLine.text}
                    onChange={(val) => updateLineText(currentLine.id, val)}
                />

                <hr style={styles.divider} />

                <ExpressionSection
                    actors={currentLine.actors}
                    characterList={characterList}
                    onChange={(actorId, idx) => {
                        const next = currentLine.actors.map(a =>
                            a.id === actorId ? { ...a, characterImageIdx: idx } : a
                        );
                        updateLineActors(currentLine.id, next, currentLine.speakers);
                    }}
                />
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