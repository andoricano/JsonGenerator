import { useState } from "react";

type ActionBarProps = {
    images : File[];
    onSelecting: (files: File[]) => void;
    onCancel: () => void;
};


export default function Gallery({
    images,
    onSelecting,
    onCancel,
}: ActionBarProps) {

    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const toggleSelect = (file: File) => {
        setSelectedImages(prev =>
            prev.includes(file)
                ? prev.filter(f => f !== file)
                : [...prev, file]
        );
    };

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onSelecting(selectedImages);
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCancel();
    };

    return (
        <div>
            {/* 이미지 목록 예시 */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {images.map((file) => (
                    <div
                        key={file.name}
                        onClick={() => toggleSelect(file)}
                        style={{
                            width: 80,
                            height: 80,
                            border:
                                selectedImages.includes(file)
                                    ? "2px solid #007bff"
                                    : "2px solid #ccc",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                ))}
            </div>

            {/* Save / Cancel */}
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