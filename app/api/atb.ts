/**
 * Airtable client
 */

import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";

const ATB_BRAND_KEY = "appnoWCohQTDJc8P4";
const ATB_CREATOR_KEY = "appJ45ZVWgKbuBZoV";

const instant = (key: string) => {
	return async <T>(
		query: string,
		variables?: string | Object,
		_note?: string
	) => {
		const res = await axios<{ data: T; errors?: any }>({
			method: "post",
			url: `https://api.baseql.com/airtable/graphql/${key}`,
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
			},
			data: {
				query,
				variables,
			},
		});

		// TODO: Implement error handler
		if (res.data.errors) {
			// const user = await getProfileClient();
			// await registerAirtableError({
			// 	email: user?.user.email_address || "",
			// 	log: JSON.stringify(res.data.errors),
			// 	tableType: "creator",
			// 	errorStatus: toString(res.status),
			// 	url: !isEmpty() ? window.location.href : "Server side",
			// 	note,
			// });
		}

		return res.data.data;
	};
};

export const atbQuery = (query: string) =>
	print(
		gql`
			${query}
		`
	);

export const atb = {
	creator: instant(ATB_CREATOR_KEY),
	brand: instant(ATB_BRAND_KEY),
};
