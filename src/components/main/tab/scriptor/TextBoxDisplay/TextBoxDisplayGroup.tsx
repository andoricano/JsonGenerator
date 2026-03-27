import TextBoxChracter from './TextBoxCharacter';
import TextBoxScript from './TextBoxScript';
import { useCurrentLine } from '../../../../../stores/useStore';

export default function TextBoxDisplayGroup() {
    const scriptString = useCurrentLine();
    if (!scriptString) return null;

    return (
        <div>
            <TextBoxChracter
                scriptCharacter={scriptString.actors}
            />
            <TextBoxScript
                scriptString={scriptString}
            />
        </div>
    );
}