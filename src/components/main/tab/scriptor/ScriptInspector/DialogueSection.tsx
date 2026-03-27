export function DialogueSection({
    text,
    onChange
}: { text: string, onChange: (val: string) => void }) {
    return (
        <div style={styles.section}>
            <label style={styles.label}>Dialogue</label>
            <textarea
                style={styles.textarea}
                value={text}
                onChange={(e) => onChange(e.target.value)}
                placeholder="대사를 입력하세요..."
            />
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    labelRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: "11px",
        fontWeight: 600,
        color: "#8e8e8e",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    },
    charCount: {
        fontSize: "10px",
        color: "#bbb",
    },
    textarea: {
        width: "100%",
        minHeight: "120px",
        padding: "12px",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#333",
        backgroundColor: "#ffffff",
        border: "1px solid #d1d1d1",
        borderRadius: "6px",
        outline: "none",
        resize: "vertical",
        boxSizing: "border-box",
        transition: "border-color 0.2s, box-shadow 0.2s",
    }
};