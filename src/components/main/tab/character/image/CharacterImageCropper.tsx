import React, { useState, useRef } from "react";
import ReactCrop, { type Crop, PixelCrop, centerCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "../../../../../services/imageUtils";

type ImageCropperDialogProps = {
    isOpen: boolean;
    imageSrc: string;
    onConfirm: (file: File) => void;
    onClose: () => void;
};

const CharacterImageCropper: React.FC<ImageCropperDialogProps> = ({
    isOpen,
    imageSrc,
    onClose,
    onConfirm,
}) => {
    const [crop, setCrop] = useState<Crop>({
        unit: "%",
        x: 5,
        y: 5,
        width: 90,
        height: 90,
    });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const imgRef = useRef<HTMLImageElement>(null);

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;

        const initialCrop = centerCrop(
            {
                unit: "%",
                width: 90,
                height: 90,
            },
            width,
            height
        );
        setCrop(initialCrop);
    };

    const handleConfirm = async () => {
        if (completedCrop && imgRef.current) {
            try {
                const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
                if (croppedBlob) {
                    const file = new File([croppedBlob], "cropped_image.jpg", { type: "image/jpeg" });
                    onConfirm(file);
                }
            } catch (error) {
                console.error("Crop failed:", error);
                alert("이미지 자르기에 실패했습니다.");
            }
        }
    };
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.dialog}>
                <h2 style={{ marginBottom: "16px" }}>이미지 자르기</h2>

                <div style={styles.cropWrapper}>
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                    >
                        <img
                            ref={imgRef}
                            src={imageSrc}
                            alt="Crop"
                            onLoad={onImageLoad}
                            style={{ maxWidth: "100%", maxHeight: "60vh", display: "block" }}
                        />
                    </ReactCrop>
                </div>

                <div style={styles.buttonRow}>
                    <button
                        onClick={handleConfirm}
                        style={styles.confirmButton}
                        disabled={!completedCrop?.width || !completedCrop?.height}
                    >
                        적용하기
                    </button>
                    <button onClick={onClose} style={styles.closeButton}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 3000 },
    dialog: { backgroundColor: "white", padding: "24px", borderRadius: "16px", width: "fit-content", maxWidth: "90vw" },
    cropWrapper: { backgroundColor: "#000", borderRadius: "8px", overflow: "hidden" },
    buttonRow: { display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "20px" },
    confirmButton: { padding: "10px 24px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    closeButton: { padding: "10px 24px", backgroundColor: "#eee", border: "none", borderRadius: "6px", cursor: "pointer" }
};

export default CharacterImageCropper;