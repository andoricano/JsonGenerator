import { useStore } from '../../../../stores/useStore';
import { AppState } from '../../../../stores/storeType';
import ImageSceneSection from './ImageSceneSection';
import TextBoxSection from './TextBox/TextBoxSection';

export default function Scriptor() {
    const lineItems = useStore((state: AppState) => state.lineItems);
    const selectedIndex = useStore((state: AppState) => state.selectedIndex);
    const characterList = useStore((state: AppState) => state.characterList);

    const updateLineText = useStore((state: AppState) => state.updateLineText);
    const updateLineActors = useStore((state: AppState) => state.updateLineActors);

    const currentScript = lineItems[selectedIndex];

    if (!currentScript) return null;

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
                onCharacter={(updatedActors) => {
                    updateLineActors(currentScript.id, updatedActors);
                }}
            />

            <TextBoxSection
                scriptString={currentScript}
                updateScriptText={(text) => {
                    if (currentScript.actors[0]) {
                        updateLineText(currentScript.id, currentScript.actors[0].id, text);
                    }
                }}
                onCharacter={(updatedActors) => {
                    updateLineActors(currentScript.id, updatedActors);
                }}
                characterList={characterList}
            />
        </div>
    );
}