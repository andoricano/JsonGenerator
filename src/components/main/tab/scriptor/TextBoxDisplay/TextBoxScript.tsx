import { LineItem } from '../../../../../stores/canvasType';

type TextBoxScriptProps = {
    scriptString: LineItem;
};

export default function TextBoxScript({ scriptString }: TextBoxScriptProps) {
    // LineItem 구조에 맞춰 첫 번째 액터의 텍스트를 참조합니다.
    const actorText = scriptString.actors[0]?.actorText || "";
    const hasText = actorText.trim() !== "";

    return (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                padding: '8px',
                backgroundColor: '#4caf50',
                marginBottom: '10px',
                borderRadius: '4px',
            }}
        >
            <div
                style={{
                    padding: '12px',
                    borderRadius: '12px',
                    minWidth: '10%',
                    maxWidth: '90%',
                    backgroundColor: '#136415ff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <span
                    style={{
                        color: hasText ? '#fff' : '#ffffffb3',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                    }}
                >
                    {hasText ? actorText : "대사를 입력해주세요."}
                </span>
            </div>
        </div>
    );
}