import React, { useState, useEffect } from "react";

type ImageUploaderDialogProps = {
  isOpen: boolean;
  onConfirm: (files: File[]) => void; // 단일 File이 아닌 File[] 배열을 넘김
  onClose: () => void;
};

const ImageUploaderDialog: React.FC<ImageUploaderDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPreviews([]);
      setSelectedFiles([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter(file => file.type.startsWith("image/"));

    // 기존 선택된 파일들에 추가 (중복 방지는 파일명 등으로 가능하지만 일단 단순 합침)
    setSelectedFiles(prev => [...prev, ...newFiles]);

    // 미리보기 생성
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleConfirm = () => {
    if (selectedFiles.length > 0) {
      onConfirm(selectedFiles);
    }
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "12px" }}>이미지 다중 업로더</h2>

        <div
          style={styles.dropArea}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          여러 장의 이미지를 드래그하거나 아래 버튼을 클릭하세요
        </div>

        <label style={styles.button}>
          파일 찾기 (다중 선택 가능)
          <input
            type="file"
            accept="image/*"
            multiple // [핵심] 다중 선택 활성화
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {/* 선택된 이미지 미리보기 그리드 */}
        <div style={styles.previewContainer}>
          {previews.map((src, i) => (
            <img key={i} src={src} alt={`preview-${i}`} style={styles.previewThumb} />
          ))}
        </div>

        <div style={styles.buttonRow}>
          <button onClick={handleConfirm} style={styles.confirmButton} disabled={selectedFiles.length === 0}>
            {selectedFiles.length}장 추가하기
          </button>
          <button onClick={onClose} style={styles.closeButton}>닫기</button>
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
  confirmButton: { padding: "10px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" },
  closeButton: { padding: "10px 20px", backgroundColor: "#eee", border: "none", borderRadius: "6px", cursor: "pointer" }
};

export default ImageUploaderDialog;