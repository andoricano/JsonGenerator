import React, { useState, useEffect } from 'react';
import { useStore, useCurrentLine } from '../../../../../stores/useStore';
import TextBoxChracterEditing from './TextBoxEditingCharacter';
import TextBoxEditingScript from './TextBoxEditingScript';

export default function TextBoxEditGroup({ onExit }: { onExit: () => void }) {
    const currentLine = useCurrentLine();
    const characterList = useStore((state) => state.characterList);
    const updateLineText = useStore((state) => state.updateLineText);
    const updateLineActors = useStore((state) => state.updateLineActors);

    const [script, setScript] = useState(currentLine?.text || "");
    const [character, setCharacter] = useState(currentLine?.actors || []);

    useEffect(() => {
        if (currentLine) {
            setScript(currentLine.text || "");
            setCharacter(currentLine.actors || []);
        }
    }, [currentLine]);

    if (!currentLine) return null;


    const handleSave = () => {
        if (!currentLine) return;

        const speakerNames = character.map(actor => {
            const target = characterList.find(c => c.id === actor.characterId);
            return target?.name || "알 수 없음";
        });

        updateLineText(currentLine.id, script);

        updateLineActors(currentLine.id, character, speakerNames);

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