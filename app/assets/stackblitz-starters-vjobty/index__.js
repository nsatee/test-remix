const express = require("express");
const app = express();
const port = 3010;
const path = require("path");
const { iwaTag, iwa, iwaId, iwaIdUrl } = require("instagram-without-api-node");
// const instagramScraper = require("instagram-scraper");

// const _cookie =
// 	'dpr=2; fbm_124024574287414=base_domain=.instagram.com; ig_did=44DA8298-14C9-4893-B5AD-FA6B2E88E743; ig_nrcb=1; mid=ZIooKgAEAAGbz5cqupwCfrJnyhSS; datr=NyiKZMcwHYJK3sRaggLp5scW; csrftoken=U4Mj3eMlWWQUQEDudQGG1l979IQjX5Vr; ds_user_id=60098110811; fbsr_124024574287414=vs7AdDSC3_02fbvDufRpzfLpNDVjd7CAN6DUb6jxfao.eyJ1c2VyX2lkIjoiMTAwMDA4NTgxMTUzOTQxIiwiY29kZSI6IkFRQ19hcG85dUU1N2lzU25rWWQwQnJXOGRLamRLaFphLUtnMTVmeGF2dGhaZFp1Rk1NWkhZSDdvcjFLRnVrekVnSzRCNXdURHdKZVU2aXUwRVJWeEdZWmRZOV9nYWVrcTUwUC1FNk1HcEl1ZS1FdVRaYjM5MjB0UnQ0eUtlbTlaZWZaS2sxLW5WRWh6ZVY3bWI5ekNXWTBfUk02eWxkMjRiSHhiMkRyTG9UVGpoWUFBdml0UmkwR095OHkxcW9ISkVGejlxWWRzcXBBdF84OXZqSm5JM0pzNTkyTm9BOF91bmdCZHZmMU5OR1RleEdYWjRxRlNMMENoQUtZWGw5YmNEc0xaSUtNYU15M1ZKeTRzVENfT0NMVVpKOTRTci03dHpDcWJQeTlUODRFMkFyRElOQkdmM004WEhzQThBbFZpZ0VoaXFXNWpqLTlkV01ia3NPREVNZmVwUnJ1M1I2WXc1dzFaWHV3T1VYWS1iZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFLYXF1ZURWdnBOcTBUaWZDQ2M2QnEyajBzMXR5bUpNWFV6eDZvUWpMaXBONWpBVzlUWkJ3RnE5NGpBeW41RGJZaWx5MzI4VTRnOGFqWkFrSkp0VDlIQVFINFlncVMzNURoRTFSZ05aQ3RpRUZFRHBxYVA0UkdYU2ZNSXgzZlllYk9WeTQ5WXJJYXJNaXBNVHNFZ29aQWFTS3czNlRaQ3lxalZmZDJQUVQ0ZEhKaVdMcmsxQkI2UkQyS283SU5BWkRaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjg2ODcyNzg4fQ; sessionid=60098110811%3A6CRuHp9EK0CyKP%3A21%3AAYca2ikVCKzji8i0QtWKOKsezHDaQhGVvtMURZIMYg; rur="EAG\05460098110811\0541718408795:01f7a910a3f516009e034a9f7ec967a55d05dd4b0a0d82d74532b845fbe56d948a9c7212"';
// const _userAgent =
// 	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"; // <!-- required!! please get your user-agent from your browser console (7)
// const _xIgAppId = "936619743392459";

app.get("/", async (req, res) => {
	// await ig.getUserIdFromUsername("instagram");
	try {
		const data = await instagramScraper.getUserData("wise_nsatee");
		console.log(data);
		// const responseIwaTag = await iwaTag({
		// 	group: "recent",

		// 	headers: {
		// 		cookie: _cookie,
		// 		"user-agent": _userAgent,
		// 		"x-ig-app-id": _xIgAppId,
		// 	},
		// 	// <!-- optional, reload contents after 3600 seconds by default

		// 	id: "code", // <!-- id is required
		// });
		return res.json(extract(data));
	} catch (error) {
		console.log(error);
		return res.json({ error: true });
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
