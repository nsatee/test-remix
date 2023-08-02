import { atb, atbQuery } from "../atb";
import { TableImage } from "../common.type";
import { Membership } from "./SearchInfluencer";

export interface InfluencerDetailData {
	creators: Creator[];
}

export interface Creator {
	id: string;
	name: string;
	firstName: string;
	lastName: string | null;
	market: string;
	creatorType: string[] | null;
	audienceSize: string;
	instagramHandle: string | null;
	facebookHandle: null | null;
	headshot: TableImage[];
	top: boolean;
	tikTokHandle: string | null;
	twitterHandle: string | null;
	youTubeHandle: string | null;
	lowPayRate: number;
	preferredPayRateImages: number;
	preferredPayRateVideo: number;
	membership: Membership | null;
}

export interface Application {
	id: string;
	igPost: string | null;
	tikTokPost: string | null;
}

export interface CreatorLatestPostData {
	applications: Application[];
	collabs: Application[];
}

export const http_getInfluencerById = async ({ id }: { id: string }) => {
	const res = await atb.creator<InfluencerDetailData>(
		atbQuery(`
      query GetCreatorById ($id: String) {
        creators(id: $id) {
          id
          name
          firstName
          lastName
          market
          creatorType
          audienceSize
          instagramHandle
          facebookHandle
          headshot
          top
          tikTokHandle
          twitterHandle
          youTubeHandle
          lowPayRate
          preferredPayRateImages
          preferredPayRateVideo
          membership
        }
      }
    `),
		{
			id,
		}
	);

	return res.creators?.[0];
};

export const http_getLatestPostByInfluencerName = async (input: {
	creatorId: string[];
	creatorName: string;
}) => {
	const res = await atb.creator<CreatorLatestPostData>(
		atbQuery(`
    query GetLatestPostByInfluencerName ($creatorId: [String], $creatorName: String) {
      applications(creator: $creatorName, status: "Posted") {
        id
        igPost
        tikTokPost
      }
      collabs(creatorId: $creatorId, status: "Posted") {
        id
        igPost
        tikTokPost
      }
    }
  `),
		input
	);
	return [...res.applications, ...res.collabs];
};
