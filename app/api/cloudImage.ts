import axios from "axios";
import { resizeImage } from "../utils/resizeImage";
export type CloudinaryResponse = {
	asset_id: string;
	public_id: string;
	version: number;
	version_id: string;
	signature: string;
	width: number;
	height: number;
	format: string;
	resource_type: string;
	created_at: Date;
	tags: any[];
	bytes: number;
	type: string;
	etag: string;
	placeholder: boolean;
	url: string;
	secure_url: string;
	folder: string;
	access_mode: string;
	original_filename: string;
	original_extension: string;
};

export const cloudImage = async (
	file: File,
	opts?: { disableResize?: boolean }
) => {
	const formData = new FormData();
	const resized = opts?.disableResize
		? file
		: await resizeImage(file, {
				maxWidth: 1200,
		  });
	formData.append("file", resized);
	formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
	formData.append("upload_preset", "headshot");
	const res = await axios.post<CloudinaryResponse>(
		`https://api.cloudinary.com/v1_1/${
			import.meta.env.VITE_CLOUDINARY_NAME
		}/image/upload`,
		formData
	);

	return res.data;
};
