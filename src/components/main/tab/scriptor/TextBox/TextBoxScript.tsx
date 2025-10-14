import { ScriptString } from "../../../../../types";

type TextBoxScriptProps = {
    scriptString: ScriptString;
    onEditStart: () => void;
};

export default function TextBoxScript(
    { scriptString, onEditStart }: TextBoxScriptProps
) {

    return (
        <div
            style={{ display: 'flex', gap: '8px', padding: '8px', backgroundColor: '#4caf50', marginBottom: '10px' }}
        >
            {(
                <div
                    style={{
                        padding: '12px', borderRadius: '12px',
                        minWidth: '10%', maxWidth: '90%', cursor: 'pointer', backgroundColor: '#136415ff'
                    }}
                    onClick={onEditStart}
                >
                    <span style={{ color: '#fff' }}>
                        {
                            scriptString.script != "" ?
                            scriptString.script :
                            "대사를 입력해주세요."
                        }
                    </span>
                </div>
            )}
        </div>
    );
}