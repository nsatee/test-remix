import { StatusEnum } from "../../api/common.type";
import { createImmerStore } from "../../utils/createScopeStore";

export type SocialMediaValue = Partial<{
	value: number | string;
	link: string;
}>;

export type InfluencerCampaign = {
	locations?: {
		name: string;
		id: string;
	}[];
	title: string;
	id: string;
};

export type InfluencerRowProps = {
	influencerId: string;
	status: StatusEnum;
	name: string;
	scheduled?: string | null;
	location?: string;
	thumbnail?: string;
	blurThumbnail?: string;
	types?: string[];
	tiktok?: SocialMediaValue;
	instagram?: SocialMediaValue;
	tiktokPost?: string | null;
	instagramPost?: string | null;
	campaigns?: InfluencerCampaign[];
	scheduling?: Partial<{
		email: string | null;
		phone: string | null;
	}>;
};

export const [Provider, useInfluencerRowProps] =
	createImmerStore<InfluencerRowProps>({
		name: "Untitled",
		status: "Assessing",
		influencerId: Math.random().toString(),
	});
