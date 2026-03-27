import { useCurrentLine } from '../../../../../stores/useStore';
import TextBoxCharacter from './TextBoxCharacter';
import TextBoxScript from './TextBoxScript';

export default function TextBoxDisplayGroup() {
    const currentLine = useCurrentLine();

    if (!currentLine) return null;

    return (
        <div style={styles.groupContainer}>
            <TextBoxCharacter speakers={currentLine.speakers} />
            <TextBoxScript scriptString={currentLine} />
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    groupContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "8px", // 이름표와 대사창 사이 간격
        width: "100%",
        height: "100%"
    }
};