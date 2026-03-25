import React from 'react';

type Props = {
    isEditing: boolean;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
};
export default function CharacterMemoField({ isEditing, value, onChange, placeholder }: Props) {
    if (isEditing) {
        return (
            <div style={styles.editorWrapper}>
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={styles.textarea}
                    placeholder={placeholder}
                />
            </div>
        );
    }
    return (
        <div style={styles.memoScrollArea}>
            <div style={styles.readOnlyMemo}>
                {value || "등록된 메모가 없습니다."}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    editorWrapper: {
        flex: 1,
        display: "flex",
        minHeight: 0,
    },
    textarea: {
        flex: 1,
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "2px solid #2196f3",
        fontSize: "13px",
        lineHeight: "1.6",
        color: "#333",
        backgroundColor: "#fff",
        resize: "none",
        outline: "none",
        boxSizing: "border-box",
        overflowY: "auto",
    },
    memoScrollArea: {
        flex: 1,
        overflowY: "auto",
        paddingRight: "4px",
        minHeight: 0,
    },
    readOnlyMemo: {
        fontSize: "13px",
        lineHeight: "1.6",
        color: "#444",
        whiteSpace: "pre-wrap",
    },
};