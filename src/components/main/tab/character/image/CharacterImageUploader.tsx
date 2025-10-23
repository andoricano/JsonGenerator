import React, { useState, useEffect } from "react";


type ImageUploaderDialogProps = {
  isOpen: boolean;
  onConfirm: (file: File) => void;
  onClose: () => void;
};
const ImageUploaderDialog: React.FC<ImageUploaderDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  useEffect(() => {
    if (isOpen) {
      setPreview(null);
      setSelectedFile(null);
    }
  }, [isOpen]);


  if (!isOpen) return null;
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleConfirm = () => {
    if (selectedFile && onConfirm) {
      onConfirm(selectedFile);
    }
    setPreview(null);
    setSelectedFile(null);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };


  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "12px" }}>이미지 업로더</h2>

        <div
          style={styles.dropArea}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          드래그해서 이미지를 업로드 하세요
        </div>

        <label style={styles.button}>
          파일 찾기
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {preview && (
          <img src={preview} alt="preview" style={styles.previewImage} />
        )}

        <div style={styles.buttonRow}>
          <button onClick={handleConfirm} style={styles.confirmButton} disabled={!preview}>
            확인
          </button>
          <button
            onClick={() => {
              setPreview(null);
              setSelectedFile(null);
              onClose()
            }}
            style={styles.closeButton}>
            닫기
          </button>
        </div>
      </div>
    </div >
  );
};

export default ImageUploaderDialog;

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dialog: {
    background: "white",
    borderRadius: "12px",
    padding: "24px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },
  dropArea: {
    width: "100%",
    height: "160px",
    border: "2px dashed #9ca3af",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b7280",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  buttonRow: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  },
  confirmButton: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  previewImage: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  closeButton: {
    background: "#e5e7eb",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};