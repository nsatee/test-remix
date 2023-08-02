import { atb, atbQuery } from "../atb";
import { TableImage } from "../common.type";
import { Membership } from "./SearchInfluencer";

export type InfluencerSearchResult = {
	creators: InfluencerResult[];
};

export type InfluencerResult = {
	name: string;
	id: string;
	market: string;
	firstName: string | null;
	lastName: string | null;
	membership: Membership;
	top: boolean | null;
	headshot: TableImage[];
};

export const http_searchInfluencers = async (input: { text: string }) => {
	const res = await atb.creator<InfluencerSearchResult>(
		atbQuery(`
		query SearchInfluencers ($text: String) {
			creators(
			_order_by: [
        {top: "desc"},
        {firstName: "asc"},
        "orderByMembership"
      ], 
			_filter: {
				name: {
					_in: [$text]
        }
			}) {
				id
				name
				market
    		firstName
    		lastName
    		top
    		membership
				headshot
			}
		}
		`),
		input
	);

	return res.creators;
};
