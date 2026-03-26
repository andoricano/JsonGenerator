import { useStore } from '../../../../stores/useStore';
import ImageSceneSection from './ImageSceneSection';
import TextBoxSection from './TextBox/TextBoxSection';
export default function Scriptor() {
    const lineItems = useStore((state) => state.lineItems);
    const selectedIndex = useStore((state) => state.selectedIndex);
    const characterList = useStore((state) => state.characterList);

    const updateLineText = useStore((state) => state.updateLineText);
    const updateLineActors = useStore((state) => state.updateLineActors);

    const currentScript = lineItems[selectedIndex];

    if (!currentScript) return (
        <div style={{ flex: 1, backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            스크립트를 선택하거나 추가해주세요.
        </div>
    );

    return (
        <div
            style={{
                display: 'flex',
                flex: 1, height: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                backgroundColor: 'black',
                boxSizing: 'border-box',
                overflow: 'hidden'
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
                    const actorId = currentScript.actors[0]?.id;
                    if (actorId) {
                        updateLineText(currentScript.id, actorId, text);
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