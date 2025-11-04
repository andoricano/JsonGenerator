import { useAppStore } from '../../../../AppProvider';
import ImageSceneSection from './ImageSceneSection';
import TextBoxSection from './TextBox/TextBoxSection';

export default function Scriptor() {

    const {
        scriptItems,
        selectedIndex,
        updateScriptText,
        updateScriptorCharacter,
        characterList,
    } = useAppStore();

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
                script={scriptItems[selectedIndex]}
                onCharacter={(idx) => {}}
            />
            <TextBoxSection
                scriptString={scriptItems[selectedIndex]}
                updateScriptText={updateScriptText}
                onCharacter={updateScriptorCharacter}
                characterList={characterList}
            />
        </div>
    );
}