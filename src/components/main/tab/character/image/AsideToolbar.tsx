type ButtonItem = {
    label: string;
    onClick: () => void;
};

type ToolboxProps = {
    buttons: ButtonItem[];
};

export default function AsideToolbar({ buttons }: ToolboxProps) {
    return (
        <div style={styles.container}>
            {buttons.map((btn) => (
                <button
                    key={btn.label}
                    style={styles.button}
                    onClick={btn.onClick}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#eaeaea")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.background = "#f5f5f5")
                    }
                    onMouseDown={(e) =>
                        (e.currentTarget.style.transform = "scale(0.97)")
                    }
                    onMouseUp={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                    }
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "12px 0 0 12px",
        boxSizing: "border-box",
    },
    button: {
        width: "150px",
        padding: "10px 14px",
        fontSize: "15px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.1s",
        textAlign: "left",
    },
};