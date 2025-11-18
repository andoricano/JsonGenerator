import { useState } from "react";

type ActionBarProps = {
    images: File[];
    onSelecting: (files: File) => void;
    onCancel: () => void;
};

export default function Gallery({ images, onSelecting, onCancel }: ActionBarProps) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleSelect = (file: File) => {
        setSelectedImage(file);
    };

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (selectedImage) onSelecting(selectedImage);
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCancel();
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.dialog}>
                <div style={styles.gridContainer}>
                    {images.map((file, index) => {
                        const isSelected = selectedImage === file;

                        return (
                            <div
                                key={index}
                                onClick={() => handleSelect(file)}
                                style={{
                                    ...styles.imageBox,
                                    border: isSelected ? "2px solid #007bff" : "2px solid #ccc",
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={URL.createObjectURL(file)}
                                    style={styles.image}
                                />
                            </div>
                        );
                    })}
                </div>

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
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },

    dialog: {
        width: 420,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },

    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
    },

    imageBox: {
        width: 80,
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 4,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

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