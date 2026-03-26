import { useState, useEffect, ChangeEvent, DragEvent } from "react";

export const useImageUpload = (isOpen: boolean) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // 1. 다이얼로그가 완전히 닫힐 때만 모든 메모리 해제
    useEffect(() => {
        if (!isOpen) {
            previews.forEach(url => URL.revokeObjectURL(url));
            setPreviews([]);
            setSelectedFiles([]);
        }
    }, [isOpen]);

    const resizeImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const MIN_SAFE_SIZE = 1024 * 1024; // 1MB

            if (file.size <= MIN_SAFE_SIZE) {
                resolve(file);
                return;
            }

            const img = new Image();
            const tempUrl = URL.createObjectURL(file);
            img.src = tempUrl;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;

                if (ctx) {
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                }

                canvas.toBlob((blob) => {
                    URL.revokeObjectURL(tempUrl); // 사용 직후 해제
                    if (blob) {
                        if (blob.size < 800 * 1024 && file.size < 2 * 1024 * 1024) {
                            resolve(file);
                        } else {
                            const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
                            resolve(new File([blob], newFileName, { type: "image/jpeg" }));
                        }
                    }
                    canvas.width = 0;
                    canvas.height = 0;
                }, "image/jpeg", 0.92);
            };

            img.onerror = () => {
                URL.revokeObjectURL(tempUrl);
                resolve(file); // 에러 시 원본이라도 반환
            };
        });
    };

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const newFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));

        setSelectedFiles((prev) => [...prev, ...newFiles]);

        // 기존 previews와 합쳐서 관리
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    return {
        previews,
        selectedFiles,
        handleFileChange,
        handleDrop,
        handleDragOver: (e: DragEvent) => e.preventDefault(), // 이 부분 추가
        resizeImage
    };
};