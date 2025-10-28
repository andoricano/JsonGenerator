import { useAppStore } from '../../../../AppProvider';
import { Character } from '../../../../scene';
import TextBoxChracter from './TextBox/TextBoxCharacter';
import TextBoxSection from './TextBox/TextBoxSection';

export default function Scriptor() {

    const { scriptItems, selectedIndex, updateScriptText, textEditing, setTextEditing, updateScriptorCharacter } = useAppStore();

    const handleSelectingCharacter = (character: Character) => {
        updateScriptorCharacter(character);
    };

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
            <TextBoxChracter
                scriptString={scriptItems[selectedIndex]}
                onCharacter={handleSelectingCharacter}
            />
            <TextBoxSection />
        </div>
    );
}