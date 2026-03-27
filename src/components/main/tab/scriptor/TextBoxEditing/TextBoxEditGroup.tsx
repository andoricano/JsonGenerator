import React, { useState, useEffect } from 'react';
import { useStore, useCurrentLine } from '../../../../../stores/useStore';
import ActionBar from '../../../../component/ActionBar';
import TextBoxChracterEditing from './TextBoxEditingCharacter';
import TextBoxEditingScript from './TextBoxEditingScript';

export default function TextBoxEditGroup({ onExit }: { onExit: () => void }) {
    const currentLine = useCurrentLine();
    const characterList = useStore((state) => state.characterList);
    const updateLineText = useStore((state) => state.updateLineText);
    const updateLineActors = useStore((state) => state.updateLineActors);

    const [script, setScript] = useState(currentLine?.actors[0]?.actorText || "");
    const [character, setCharacter] = useState(currentLine?.actors || []);

    useEffect(() => {
        if (currentLine) {
            setScript(currentLine.actors[0]?.actorText || "");
            setCharacter(currentLine.actors);
        }
    }, [currentLine]);

    if (!currentLine) return null;

    const handleSave = () => {
        console.log("1. 저장 시도 - 현재 로컬 상태:", { script, character });

        const actorId = currentLine.actors[0]?.id;
        if (actorId) {

            console.log("2. 스토어 액션 호출 직전:", { lineId: currentLine.id, actorId, script });


            updateLineText(currentLine.id, actorId, script);
            updateLineActors(currentLine.id, character);
        }
        onExit();
    };

    const handleCancel = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        onExit();
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <TextBoxChracterEditing
                characterList={characterList}
                selectedActors={currentLine.actors}
                onChanging={setCharacter}
                onCancel={handleCancel}
            />
            <TextBoxEditingScript
                value={script}
                onInputChange={setScript}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
}