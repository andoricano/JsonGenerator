import React from "react";
import { useImageUpload } from "../../../../../services/useImageUpload";

type ImageUploaderDialogProps = {
  isOpen: boolean;
  onConfirm: (files: File[]) => void;
  onClose: () => void;
};

const ImageUploaderDialog: React.FC<ImageUploaderDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const {
    previews,
    selectedFiles,
    handleFileChange,
    handleDrop,
    resizeImage,
  } = useImageUpload(isOpen);

  if (!isOpen) return null;

  // 원본 그대로 업로드
  const handleOriginalConfirm = () => {
    if (selectedFiles.length > 0) {
      onConfirm(selectedFiles);
    }
    onClose();
  };

  // 최적화(리사이징) 후 업로드
  const handleOptimizedConfirm = async () => {
    if (selectedFiles.length > 0) {
      const optimizedFiles = await Promise.all(
        selectedFiles.map((file) => resizeImage(file))
      );
      onConfirm(optimizedFiles);
    }
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "12px" }}>이미지 업로드 설정</h2>

        <div
          style={styles.dropArea}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          이미지를 드래그하거나 클릭하여 추가하세요
        </div>

        <label style={styles.button}>
          파일 찾기
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        <div style={styles.previewContainer}>
          {previews.map((src, i) => (
            <img key={i} src={src} alt="preview" style={styles.previewThumb} />
          ))}
        </div>

        <div style={styles.buttonRow}>
          {/* 1. 원본 올리기 */}
          <button
            onClick={handleOriginalConfirm}
            style={styles.confirmButton}
            disabled={selectedFiles.length === 0}
          >
            원본 올리기
          </button>

          {/* 2. 최적화 올리기 (화질/메모리 우선) */}
          <button
            onClick={handleOptimizedConfirm}
            style={styles.optimizeButton}
            disabled={selectedFiles.length === 0}
          >
            최적화 올리기
          </button>

          {/* 3. 닫기 */}
          <button onClick={onClose} style={styles.closeButton}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 },
  dialog: { backgroundColor: "white", padding: "24px", borderRadius: "16px", width: "500px", maxHeight: "80vh", display: "flex", flexDirection: "column" },
  dropArea: { border: "2px dashed #ccc", borderRadius: "12px", padding: "40px", textAlign: "center", color: "#666", marginBottom: "16px", cursor: "pointer" },
  button: { backgroundColor: "#4caf50", color: "white", padding: "10px", borderRadius: "8px", textAlign: "center", cursor: "pointer", display: "block", marginBottom: "16px" },
  previewContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "8px", overflowY: "auto", flex: 1, marginBottom: "16px", padding: "4px" },
  previewThumb: { width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: "4px", border: "1px solid #eee" },
  buttonRow: { display: "flex", gap: "10px", justifyContent: "flex-end" },
  optimizeButton: { padding: "10px 20px", backgroundColor: "#388e3c", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  confirmButton: { padding: "10px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" },
  closeButton: { padding: "10px 20px", backgroundColor: "#eee", border: "none", borderRadius: "6px", cursor: "pointer" }
};

export default ImageUploaderDialog;