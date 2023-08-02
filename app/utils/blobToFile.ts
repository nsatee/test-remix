export const blobToFile = (blob: Blob) => {
	const formData = new FormData();
	const lastModified = new Date().getTime();
	const blobFile = new File([blob], `${lastModified}.jpeg`, {
		type: "image/jpeg",
		lastModified,
	});
	formData.append("file", blobFile);

	return {
		formData,
		file: blobFile,
	};
};
