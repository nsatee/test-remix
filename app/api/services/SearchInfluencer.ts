import { isEmpty } from "lodash";
import { removeEmptyChildren } from "../../utils/removeEmptyChildren";
import { atb, atbQuery } from "../atb";
import { TableImage } from "../common.type";

export type GetInfluencerInput = {
	page?: number;
	pageSize?: number;
	market?: string | undefined;
	audienceSize?: string | undefined;
	expertise?: string | undefined;
};

export enum Membership {
	ActiveMember = "Active Member",
	NonMember = "Non-Member",
	VerifiedMember = "Verified Member",
}

export interface CreatorMarketplaceData {
	creators: CreatorMarketPlace[];
}

export interface CreatorMarketPlace {
	id: string;
	name: string;
	firstName: null | string;
	lastName: null | string;
	market: null | string;
	membership: Membership | null;
	creatorType: string[] | null;
	type: string[];
	top: boolean | null;
	headshot: TableImage[] | null;
	audienceSize: string | null;
	preferredPayRateVideo: string | null;
	preferredPayRateImages: string | null;
}

export const MARKETPLACE_PAGE_SIZE = 24;

export const http_getInfluencers = async ({
	page = 1,
	pageSize = MARKETPLACE_PAGE_SIZE,
	...input
}: GetInfluencerInput) => {
	const res = await atb.creator<CreatorMarketplaceData>(
		atbQuery(`
  query GetInfluencers(
    $page: JSON, 
    $pageSize: JSON,
    ${input.market ? "$market: String," : ""}
    ${input.audienceSize ? "$audienceSize: String," : ""}
    ${input.expertise ? "$expertise: String," : ""}
  ) {
      creators(
        _order_by: "orderByMembership"
        _page: $page
        _page_size: $pageSize
        ${
					isEmpty(removeEmptyChildren(input))
						? ""
						: `
            _filter: {
              ${input.market ? "market: $market," : ""}
              ${input.audienceSize ? "audienceSize: $audienceSize," : ""}
              ${input.expertise ? "expertise: $expertise," : ""}
            }
        `
				}
        
      ) {
        id
        name
        firstName
        lastName
        market
        membership
        creatorType
        type
        top
        headshot
        audienceSize
        preferredPayRateVideo
        preferredPayRateImages
      }
    }
  `),
		removeEmptyChildren({
			page,
			pageSize,
			...input,
		})
	);

	return res.creators;
};
