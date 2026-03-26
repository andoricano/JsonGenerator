import { PixelCrop } from "react-image-crop";

export const getCroppedImg = async (
    image: HTMLImageElement,
    pixelCrop: PixelCrop
): Promise<Blob | null> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(pixelCrop.width * scaleX);
    canvas.height = Math.floor(pixelCrop.height * scaleY);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg", 1.0);
    });
};