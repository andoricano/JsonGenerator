type ActionBarProps = {
    onSave: () => void;
    onCancel: () => void;
};

export default function ActionBar({
    onSave,
    onCancel,
}: ActionBarProps) {

      const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onSave();
      };
    
      const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCancel();
      };


    return (

        <div style={styles.buttonContainer}>
            <button
                onClick={handleSave}
                style={styles.buttonSave}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                Save
            </button>

            <button
                onClick={handleCancel}
                style={styles.buttonCancel}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#aaa")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ccc")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                Cancel
            </button>
        </div>


    );
}


const styles: Record<string, React.CSSProperties> = {
  buttonContainer: {
    display: "flex",
    gap: 8,
    justifyContent: "flex-end",
  },
  buttonSave: {
    padding: "6px 10px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
  },
  buttonCancel: {
    padding: "6px 10px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#ccc",
    color: "#000",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
  },
};