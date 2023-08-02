import { atb, atbQuery } from "../atb";
import { TableImage } from "../common.type";
import { getUserEmail } from "../getUserEmail";

export type AddGroupInput = {
	id: string;
	groupName: String;
	contactName: String;
	contactEmail: String;
	website: String;
	markets: string[];
	hqAddress: String;
	linkedIn: String;
	instagram: String;
	clientTypes: String;
	softwareUsed: String;
	type: string;
	teamMember: String[];

	level: string;
	priority: string;
	status: string;
	logo: {
		url: string;
	}[];
};

export interface BrandGroup {
	groups: GroupDataResponse[];
}

export interface GroupDataResponse {
	logo: TableImage[];
	hqAddress: null;
	contactName: string;
	contactEmail: string;
	groupName: string;
	id: string;
	brands: BrandData[];
	customLogo: TableImage[] | null;
	whitelabelEnable: boolean;
	website: string;
	markets: string[];
	type: string;
}

export interface BrandData {
	bannerImage: TableImage[] | null;
	businessAddress: null | string;
	description: null | string;
	twitterLink: null | string;
	tikTokLink: null | string;
	websiteLink: null | string;
	youTubeLink: null | string;
	instagramLink: null | string;
	facebookLink: null | string;
	linkedInLink: null | string;
	image: TableImage[] | null;
	id: string;
	name: null | string;
	campaigns: { id: string }[];
	contactName: string | null;
	businessSubType: string[] | null;
	averageEngagement: string;
	totalImpression: string;
}

export const http_getGroupDataByEmail = async () => {
	const user = getUserEmail();
	if (!user) return null;
	const res = await atb.brand<BrandGroup>(
		atbQuery(
			`
      query GetGroupDataByEmail ($email: [String]) {
        groups(teamEmails: $email) {
          logo
          hqAddress
          contactName
          contactEmail
          groupName
          logo
          id
          whitelabelEnable
          website
          markets
          type
          brands {
            name
            id
            websiteLink
            description
            image
            campaigns {
              id
            }
          }
        }
      }
      `
		),
		{
			email: user,
		}
	);

	return res.groups?.[0];
};

export const http_createGroup = async (input: Partial<AddGroupInput>) => {
	return await atb.brand<{
		insert_groups: [
			{
				id: string;
			}
		];
	}>(
		atbQuery(
			`
      mutation InsertGroup(
        $groupName: String
        $contactName: String
        $contactEmail: String
        $website: String
        $markets: [String]
        $hqAddress: String
        $linkedIn: String
        $instagram: String
        $type: String
        $teamMember: [String]
        $level: String
        $priority: String
        $status: String
        $logo: [JSON]
      ) {
        insert_groups(
          groupName: $groupName
          contactName: $contactName
          contactEmail: $contactEmail
          website: $website
          markets: $markets
          hqAddress: $hqAddress
          linkedIn: $linkedIn
          instagram: $instagram
          type: $type
          teamMember: $teamMember
          level: $level
          priority: $priority
          status: $status
          logo: $logo
        ) {
          id
        }
      }
    `
		),
		input
	);
};
