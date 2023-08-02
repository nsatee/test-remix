import { format } from "date-fns";
import { atb, atbQuery } from "../atb";
import { TableImage } from "../common.type";

import { Application } from "./AllInfluencer";

export type CampaignStatus = "Unlisted" | "Published";
export type CreateCampaignInput = {
	title: string;
	brand: string[];
	locations: string[];
	whatYouRecieve: string;
	description: string;
	brandStory: string;
	retailValue: number;
	startDate: Date;
	endDate: Date;
	targetCreatorSize: string[];
	lowAge: number;
	highAge: number;
	niche: string[];
	content: string[];
	visualsTheme: string;
	caption: string;
	hashtagsMentions: string;
	inspiration: string;
	schedulingRequirements: string;
	campaignImage: TableImage;
	campaignCity: string | null;
	count: string | null;
	requirement: string;
	neighborhood: string[];
	goal: string;
	status: CampaignStatus;
};

export interface InitialCampaignForMutationResponse {
	id: string;
	title: string;
	locations: InitialCampaignLocation[];
	whatYouRecieve?: string | null;
	description?: string | null;
	brandStory?: any;
	retailValue?: any;
	startDate?: any;
	endDate?: any;
	targetCreatorSize?: any;
	lowAge?: any;
	highAge?: any;
	niche?: any;
	content?: any;
	visualsTheme?: any;
	caption?: any;
	hashtagsMentions?: any;
	inspiration?: any;
	schedulingRequirements?: any;
	campaignImage?: any;
	neighborhood: InitialCampaignLocation[];
	status: string;
	goal: string;
}

export interface InitialCampaignLocation {
	id: string;
}

export type CampaignDetailApplicationResponse = {
	id: string;
	title: string;
	status: string;
	campaignLink: string;
	brandId: string[];
};

export interface CampaignApplicationType {
	applications: Application[];
	campaigns: CampaignDetailApplicationResponse[];
}

export const http_createCampaign = async (input: CreateCampaignInput) => {
	const res = await atb.brand<{
		insert_campaigns: [
			{
				id: string;
			}
		];
	}>(
		atbQuery(
			`
	mutation InsertCampaigns(
		$title: String
		$brand: [String]
		$locations: [String]
		$whatYouRecieve: String
		$description: String
		$brandStory: String
		$retailValue: Float
		$startDate: String
		$endDate: String
		$targetCreatorSize: [String]
		$lowAge: Float
		$highAge: Float
		$niche: [String]
		$content: [String]
		$visualsTheme: String
		$caption: String
		$hashtagsMentions: String
		$inspiration: String
		$schedulingRequirements: String
		$campaignImage: [JSON]
		$campaignCity: String
		$neighborhood: [String]
    $status: String
    $goal: String
		$count: String
	) {
		insert_campaigns(
			fixedLocation: true
			title: $title
			brand: $brand
			locations: $locations
			whatYouRecieve: $whatYouRecieve
			description: $description
			brandStory: $brandStory
			retailValue: $retailValue
			startDate: $startDate
			endDate: $endDate
			targetCreatorSize: $targetCreatorSize
			lowAge: $lowAge
			highAge: $highAge
			niche: $niche
			content: $content
			visualsTheme: $visualsTheme
			caption: $caption
			hashtagsMentions: $hashtagsMentions
			inspiration: $inspiration
			schedulingRequirements: $schedulingRequirements
			campaignImage: $campaignImage
			neighborhood: $neighborhood
      status: $status
      goal: $goal
			count: $count
			campaignCity: $campaignCity
		) {
			id
		}
	}
`
		),
		{
			...input,
			startDate: input.startDate ? format(input.startDate, "yyyy-MM-dd") : null,
			endDate: input.endDate ? format(input.endDate, "yyyy-MM-dd") : null,
		}
	);

	return res;
};

export const http_getCampaignForUpdateById = async (input: {
	campaignId: string;
}) => {
	const res = await atb.brand<{
		campaigns: CreateCampaignInput & { id: string }[];
	}>(
		atbQuery(
			`
	query GetCampaignForUpdateById(
		$campaignId: String
	) {
		campaigns(
			campaignid: $campaignId
		) {
			id
			title
			locations {
				id
			}
			status
			whatYouRecieve
			description
			brandStory
			retailValue
			startDate
			endDate
			targetCreatorSize
			lowAge
			highAge
			niche
			content
			campaignCity
			visualsTheme
			caption
			hashtagsMentions
			inspiration
			schedulingRequirements
			requirement
			campaignImage
			inspiration
			count
			neighborhood {
				id
			}
      status
      goal
		}
	}
`
		),
		{
			...input,
		}
	);

	return res;
};

export const http_updateCampaignById = async (
	input: CreateCampaignInput & { campaignId: string }
) => {
	const res = await atb.brand<{
		campaigns: CreateCampaignInput[];
	}>(
		atbQuery(
			`
	mutation UpdateCampaignById(
		$campaignId: String
		$title: String
		$brand: [String]
		$locations: [String]
		$whatYouRecieve: String
		$description: String
		$brandStory: String
		$retailValue: Float
		$startDate: String
		$endDate: String
		$targetCreatorSize: [String]
		$lowAge: Float
		$highAge: Float
		$niche: [String]
		$content: [String]
		$visualsTheme: String
		$caption: String
		$hashtagsMentions: String
		$inspiration: String
		$schedulingRequirements: String
		$campaignImage: [JSON]
		$campaignCity: String
		$neighborhood: [String]
    $status: String
    $goal: String
		$count: String
	) {
		update_campaigns(
			id: $campaignId
			title: $title
			brand: $brand
			locations: $locations
			whatYouRecieve: $whatYouRecieve
			description: $description
			brandStory: $brandStory
			retailValue: $retailValue
			startDate: $startDate
			endDate: $endDate
			targetCreatorSize: $targetCreatorSize
			lowAge: $lowAge
			highAge: $highAge
			niche: $niche
			content: $content
			visualsTheme: $visualsTheme
			caption: $caption
			hashtagsMentions: $hashtagsMentions
			inspiration: $inspiration
			schedulingRequirements: $schedulingRequirements
			campaignImage: $campaignImage
			neighborhood: $neighborhood
      status: $status
      goal: $goal
			count: $count
			campaignCity: $campaignCity
			
		) {
			id
		}
	}
`
		),
		{
			...input,
			startDate: input.startDate ? format(input.startDate, "yyyy-MM-dd") : null,
			endDate: input.endDate ? format(input.endDate, "yyyy-MM-dd") : null,
		}
	);

	return res;
};

export const http_getCampaignListByApplicationId = async (input: {
	campaignIds: string;
	status?: string | null;
	locationId?: string;
	limit?: number;
	page?: number;
	orderBy?: Partial<Record<keyof Application, "desc" | "asc">>;
}) => {
	const res = await atb.brand<CampaignApplicationType>(
		atbQuery(`
	query GetApplicationByCampaignId(
		$campaignIds: String
		$status: String
		$limit: JSON
		$page: JSON
		$orderBy: JSON
	) {
		applications(
			_filter: { campaignIds: [$campaignIds], status: { _in: [$status] } }
			_page_size: $limit
			_order_by: $orderBy
			_page: $page
		) {
			id
			status
			reminderDate
			noShow
			postedDate
			matchScore
			locationTimeDisplay
			locationMatchSore
			locationMatchScoreLogic
			aestheticMatchScore
			aestheticMatchScoreLogic
			influencerMatchScore
			influencerMatchScoreLogic
			creator {
				name
				firstName
				lastName
				phoneNumber
				emailAddress
				report
				targetId
				creatorType
				market
			}
			campaign {
				title
				campaignLink
				id
				brandId
				locations {
					id
					locationName
				}
			}
			ttComments
			tikTokPost
			tikTokHandle
			igViews
			igPost
			igLikes
			igFollowersFromCreator
			ttFollowers
			ttLikes
			ttShares
			ttViews
			headshotFromCreator
			creatorIgHandle
			confirmApplication
			scheduled
			igEngagement
			igComments
			ttEngagement
			actionDate
		}

		campaigns(id: $campaignIds) {
			id
			title
			status
			campaignLink
			brandId
		}
	}
	`),
		{
			...input,
			orderBy: input.orderBy || { actionDate: "desc" },
			status: input.status === "All" ? "" : input.status,
		}
	);

	return res;
};

export const http_getTotalCampaignListByApplicationId = async ({
	campaignIds,
	status = "",
}: {
	campaignIds: string;
	status?: string;
}) => {
	const res = await atb.brand<CampaignApplicationType>(
		atbQuery(`
		query GetApplicationTotalByCampaignId(
			$campaignIds: String
			$status: String
		) {
			applications(
				_filter: { campaignIds: [$campaignIds], status: { _in: [$status] } }
				
			) {
				id
			}
		}
    `),
		{
			campaignIds,
			status: status === "All" ? "" : status,
		}
	);

	return res.applications.length;
};
