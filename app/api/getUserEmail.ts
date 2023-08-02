import { getCookie } from "cookies-next";
import { USER_SESSION_COOKIE_KEY } from "./services/User";
import * as CryptoJS from "crypto-js";

export const getUserEmail = () => {
	const userData = getCookie(USER_SESSION_COOKIE_KEY);
	if (!userData) return null;
	const user = CryptoJS.AES.decrypt(
		userData as string,
		import.meta.env.VITE_USESSION_SECRET
	).toString(CryptoJS.enc.Utf8);

	return user?.split(`"`).join("");
};
