import { notifications } from "@mantine/notifications";
import { blobToFile } from "./blobToFile";

export const resizeImage = (
	file: Blob,
	options?: { maxWidth?: number; maxHeight?: number }
) => {
	const MAX_WIDTH = options?.maxWidth || 800;
	const MAX_HEIGHT = options?.maxHeight || 600;
	const MIME_TYPE = "image/jpeg";
	const QUALITY = 0.85;

	return new Promise<File>((resolve, reject) => {
		const blobURL = URL.createObjectURL(file);
		const img = new Image();
		img.src = blobURL;
		img.onerror = function () {
			URL.revokeObjectURL(img.src);
			notifications.show({
				title: "Uploader",
				message: "Upload fails.",
				color: "red",
			});
		};
		img.onload = function () {
			URL.revokeObjectURL(img.src);
			const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
			const canvas = document.createElement("canvas");
			canvas.width = newWidth;
			canvas.height = newHeight;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(img, 0, 0, newWidth, newHeight);
				return canvas.toBlob(
					(blob) => {
						if (blob) {
							const result = blobToFile(blob).file;
							resolve(result);
						} else {
							reject("Cannot blob file");
						}
					},
					MIME_TYPE,
					QUALITY
				);
			}
		};
	});
};

function calculateSize(
	img: HTMLImageElement,
	maxWidth: number,
	maxHeight: number
) {
	let width = img.width;
	let height = img.height;

	// calculate the width and height, constraining the proportions
	if (width > height) {
		if (width > maxWidth) {
			height = Math.round((height * maxWidth) / width);
			width = maxWidth;
		}
	} else {
		if (height > maxHeight) {
			width = Math.round((width * maxHeight) / height);
			height = maxHeight;
		}
	}
	return [width, height];
}
