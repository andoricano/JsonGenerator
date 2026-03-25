import React from 'react';

type Props = {
    isEditing: boolean;
    value: string;
    onChange: (val: string) => void;
    isValid: boolean;
    placeholder?: string;
};

export default function CharacterNameField({ isEditing, value, onChange, isValid, placeholder }: Props) {
    if (isEditing) {
        return (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    ...styles.input,
                    borderColor: isValid ? "#2a5b2e" : "#f44336"
                }}
                placeholder={placeholder}
            />
        );
    }

    return (
        <div
            style={styles.readOnlyValue}
            title={value}
        >
            {value}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ddd",
        outline: "none",
        boxSizing: "border-box",
        fontSize: "14px"
    },
    readOnlyValue: {
        width: "100%",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#1a3b1d",
        paddingBottom: "4px",
        borderBottom: "2px solid #2a5b2e",

        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        boxSizing: "border-box"
    }
};