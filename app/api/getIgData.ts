import axios from "axios";

export const getIgUserInfo = async (url: string) => {
	try {
		const response = await axios.post(
			"https://node-ig-scrapper.onrender.com/user",
			{ url }
		);

		console.log(response.data);
	} catch (err) {
		console.error(err);
	}
};
