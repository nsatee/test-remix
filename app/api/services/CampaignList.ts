import { atb, atbQuery } from "../atb";
import { CampaignStatus, TableImage } from "../common.type";

export const http_getCampaignList = async ({ email }: { email: string }) => {
	const res = await atb.brand<{ campaigns: CampaignListData[] }>(
		atbQuery(`
  query GetCampaignList($email: String) {
    campaigns(
      _filter: {
        _or: [
          { brandContactEmail: $email }
          { teamEmailString: { _in: [$email] } }
        ]
      }
    ) {
      title
      description
      campaignImage
      id
      engagement
      impressions
      goal
      status
      applications {
        id
      }
			brandId
    }
  }
  `),
		{
			email,
		}
	);

	return res.campaigns;
};

export type UpdateCampaignInput = {
	campaignId: string;
	isPublished: boolean;
};
export const http_updatePublishedCampaign = async ({
	campaignId,
	isPublished,
}: UpdateCampaignInput) => {
	await atb.brand<CampaignListData>(
		`mutation TogglePublishCampaign($id: String, $status: String) {
  update_campaigns(id: $id, status: $status) {
    id
    status
  }
}`,
		{
			id: campaignId,
			status: !isPublished ? "Published" : "In Progress",
		}
	);
};

export type CampaignListData = {
	title: string;
	campaignImage: TableImage[];
	id: string;
	engagement: string;
	description: string | null;
	impressions: string;
	goal: string;
	status: CampaignStatus;
	applications: {
		id: string;
	}[];
	brandId: string[];
};
