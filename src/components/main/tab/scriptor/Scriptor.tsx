import React from 'react';
import { useStore } from '../../../../stores/useStore';
import ImageSceneSection from './ImageSceneSection';
import TextBoxSection from './TextBox/TextBoxSection';

export default function Scriptor() {
    const scriptItems = useStore((state) => state.scriptItems);
    const selectedIndex = useStore((state) => state.selectedIndex);
    const characterList = useStore((state) => state.characterList);

    const updateScriptText = useStore((state) => state.updateScriptText);
    const updateScriptorCharacter = useStore((state) => state.updateScriptorCharacter);


    const currentScript = scriptItems[selectedIndex];

    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                backgroundColor: 'black',
                boxSizing: 'border-box',
            }}
        >
            <ImageSceneSection
                script={currentScript}
                onCharacter={(character) => {

                }}
            />

            <TextBoxSection
                scriptString={currentScript}
                updateScriptText={updateScriptText}
                onCharacter={updateScriptorCharacter}
                characterList={characterList}
            />
        </div>
    );
}