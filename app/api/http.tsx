import axios from "axios";
// import { getCookie } from "cookies-next";

// let urls = {
// 	test: `http://localhost:8000`,
// 	development: `https://wiseassistant-staging.herokuapp.com`,
// 	production: `https://backend.gogetwise.com`,
// };
// let urls = {
// 	test: `http://localhost:8000`,
// 	development: `http://localhost:8000`,
// 	production: `https://backend.gogetwise.com`,
// };
let urls = {
	test: `http://localhost:8000`,
	development: `https://backend.gogetwise.com`,
	production: `https://backend.gogetwise.com`,
};

// const session = getCookie("session");

// fetch("https://backend.gogetwise.com/rest-auth/login/", {
// 	headers: {
// 		accept: "application/json, text/plain, */*",
// 		"accept-language": "en-US,en;q=0.9",
// 		"content-type": "application/json",
// 		"sec-ch-ua":
// 			'"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
// 		"sec-ch-ua-mobile": "?0",
// 		"sec-ch-ua-platform": '"macOS"',
// 		"sec-fetch-dest": "empty",
// 		"sec-fetch-mode": "cors",
// 		"sec-fetch-site": "same-site",
// 	},
// 	referrer: "https://www.gogetwise.com/",
// 	referrerPolicy: "strict-origin-when-cross-origin",
// 	body: '{"email":"golfie@wiseassistant.com","password":"Test1234!"}',
// 	method: "POST",
// 	mode: "cors",
// 	credentials: "omit",
// });

// fetch("http://localhost:3000/sign-in?_data=routes%2Fsign-in", {
// 	headers: {
// 		accept: "*/*",
// 		"accept-language": "en-US,en;q=0.9",
// 		"content-type": "application/x-www-form-urlencoded;charset=UTF-8",
// 		"sec-ch-ua":
// 			'"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
// 		"sec-ch-ua-mobile": "?0",
// 		"sec-ch-ua-platform": '"macOS"',
// 		"sec-fetch-dest": "empty",
// 		"sec-fetch-mode": "cors",
// 		"sec-fetch-site": "same-origin",
// 	},
// 	referrer: "http://localhost:3000/sign-in",
// 	referrerPolicy: "strict-origin-when-cross-origin",
// 	body: "email=golfie%40wiseassistant.com&password=Test1234%21",
// 	method: "POST",
// 	mode: "cors",
// 	credentials: "include",
// });

// fetch("https://backend.gogetwise.com/rest-auth/login/", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "application/json",
//     "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrer": "http://localhost:5173/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"email\":\"golfie@wiseassistant.com\",\"password\":\"Test1234!\"}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "omit"
// });

export const http = axios.create({
	baseURL: "https://backend.gogetwise.com",
	headers: {
		accept: "application/json, text/plain, */*",
		"Content-Type": "application/x-www-form-urlencoded",
	},

	// headers: session
	// 	? {
	// 			Authorization: `Token ${session}`,
	// 	  }
	// 	: undefined,
}) as typeof axios;

export type HttpProcess<Result> = Partial<{
	onError: (err: any) => void;
	onSuccess: (value: Result) => void;
}>;
