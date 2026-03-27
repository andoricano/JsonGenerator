type TextBoxCharacterProps = {
  speakers: string[];
};

export default function TextBoxCharacter({ speakers }: TextBoxCharacterProps) {

  if (!speakers || speakers.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.userButton}>무명</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {speakers.map((name, index) => (
        <div key={`${name}-${index}`} style={styles.userButton}>
          {name.trim() || "no"}
        </div>
      ))}
    </div>
  );
}



const styles: Record<string, React.CSSProperties> = {

  container:
  {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    margin: "5px",
    borderBottom: "1px solid #ccc",
    padding: "8px 15px",
  },
  userButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    padding: "4px 10px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
    whiteSpace: "nowrap",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
  }
};