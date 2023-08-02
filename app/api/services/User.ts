// import { deleteCookie, getCookie, setCookie } from "cookies-next";
import * as CryptoJS from "crypto-js";

import { atb, atbQuery } from "../atb";
import { http } from "../http";
import { SetupPreferenceInputType } from "./SetupPreferences";
import { resizeImage } from "../../utils/resizeImage";

export type UserInfo = {
	domain_purchased: boolean;
	phone_purchased: boolean;
	id: string;
	email_address: string;
	referral_id: string;
	is_staff: boolean;
	is_creator: boolean;
	sms_enabled: boolean;
	subscription_status: "pro" | "free";
};

export type SignInInputType = {
	email: string;
	password: string;
};

export type RegisterInputType = SignInInputType & {};

export type SessionResponseType = {
	key: string;
};

export type HttpProcess<Result> = Partial<{
	onError: (err: any) => void;
	onSuccess: (value: Result) => void;
}>;

export type UserContact = {
	tiktok_link?: string;
	instagram_link?: string;
	fb_link?: string;
};

export type UserProfile = UserContact & {
	id: string;
	bio?: string;
	username?: string;
	standard_profile?: string;
	profile_picture?: string;
	first_name: string;
	last_name: string;
};

export type OnboardingProfileInput = {
	username: string;
	first_name: string;
	last_name: string;
};

export type UpdatePasswordInput = {
	old_password: string;
	new_password1: string;
	new_password2: string;
};

export const http_signin = async (value: SignInInputType) => {
	const res = await http.post<SessionResponseType>("/rest-auth/login/", {
		...value,
		email: value.email.toLowerCase().trim(),
	});
	return res;
};

export const http_register = async (body: RegisterInputType) => {
	return await http.post<SessionResponseType>("/rest-auth/registration/", {
		email: body.email.toLowerCase().trim(),
		password1: body.password,
		password2: body.password,
	} as Partial<SessionResponseType>);
};

export const USER_SESSION_COOKIE_KEY = "usession";

export const http_getCurrentUser = async () => {
	const { data: userData } = await http.get<UserInfo>("/rest-auth/user/");
	// if (!getCookie(USER_SESSION_COOKIE_KEY)) {
	// 	const parsedUser = CryptoJS.AES.encrypt(
	// 		JSON.stringify(userData.email_address),
	// 		import.meta.env.VITE_USESSION_SECRET
	// 	).toString();
	// 	setCookie(USER_SESSION_COOKIE_KEY, parsedUser);
	// 	setCookie(USER_SESSION_COOKIE_KEY, parsedUser, {
	// 		domain: !import.meta.env.DEV ? "wiseassistant.com" : "localhost",
	// 	});
	// }
	return userData;
};

export const http_getCurrentProfile = async () => {
	const { data: profileData } = await http.get<UserProfile>(
		"/profiles/public-profile/"
	);
	return profileData;
};

export const http_updatePublicProfile = async (input: Partial<UserProfile>) => {
	await http.post("/profiles/public-profile/", input);
	return input;
};

export const http_uploadProfileImage = async (input: File) => {
	const prepImage = await resizeImage(input);
	const formData = new FormData();
	console.log(prepImage);
	formData.append("file", prepImage);
	const res = await http.post("/profiles/profile-image/", formData);
	return res.data;
};

export const http_signout = () => {
	// deleteCookie("session", {
	// 	domain: !import.meta.env.DEV ? "wiseassistant.com" : "localhost",
	// });
	// deleteCookie(USER_SESSION_COOKIE_KEY, {
	// 	domain: !import.meta.env.DEV ? "wiseassistant.com" : "localhost",
	// });
	// deleteCookie("session");
	// deleteCookie(USER_SESSION_COOKIE_KEY);
	window.location.href = "/sign-in";
};

export const http_loginWithSesameKey = async (sesameKey: string) => {
	const { data } = await http.get<SessionResponseType>(
		`/users/sesame/login/?sesame=${sesameKey}`
	);
	return data;
};

export const http_updatePassword = async (input: UpdatePasswordInput) => {
	return await http.post("/rest-auth/password/change/", input);
};

export const http_getCreatorFromAirtableWithEmail = async () => {
	// const userData = getCookie(USER_SESSION_COOKIE_KEY);
	// if (!userData) return null;
	// const user = CryptoJS.AES.decrypt(
	// 	userData as string,
	// 	import.meta.env.VITE_USESSION_SECRET
	// ).toString(CryptoJS.enc.Utf8);
	const res = await atb.creator<{
		creators: SetupPreferenceInputType[];
	}>(
		atbQuery(`
		query GetMeByEmail ($email:String) {
			creators(emailAddress: $email) {
				id
				type
				membership
				onboarded
				instagramHandle
				tikTokHandle
				facebookHandle
				youTubeHandle
				emailAddress
				twitterHandle
				phoneNumber
				headshot
				name
				tier
				firstName
				lastName
			}
		}
	`),
		{
			// email: user.split(`"`).join(""),
		}
	);

	return res?.creators?.[0] || null;
};

export const http_getCreatorFromBrandAirtableWithEmail = async () => {
	// const userData = getCookie(USER_SESSION_COOKIE_KEY);
	// if (!userData) return null;
	// const user = CryptoJS.AES.decrypt(
	// 	userData as string,
	// 	import.meta.env.VITE_USESSION_SECRET
	// ).toString(CryptoJS.enc.Utf8);
	const res = await atb.brand<{
		creators: SetupPreferenceInputType[];
	}>(
		atbQuery(`
		query GetBrandMeByEmail ($email:String) {
			creators(emailAddress: $email) {
				id
				type
				membership
				instagramHandle
				tikTokHandle
				facebookHandle
				youTubeHandle
				twitterHandle
				phoneNumber
				headshot
				name
				firstName
				lastName
				tier
			}
		}
	`),
		{
			// email: user.split(`"`).join(""),
		}
	);

	return res?.creators?.[0] || null;
};
