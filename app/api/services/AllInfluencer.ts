import { format } from "date-fns";
import { atb, atbQuery } from "../atb";
import { StatusEnum, TableImage } from "../common.type";

export interface CampaignApplicationType {
	applications: Application[];
}
export interface Creator {
	name: string;
	firstName: string;
	lastName: null | string;
	phoneNumber: null | string;
	emailAddress: string;
	report: TableImage[];
	targetId: string;
	market: string | null;
	creatorType: string[] | null;
}

export interface Application {
	id: string;
	reminderDate: string | null;
	noShow: null | boolean;
	status: StatusEnum;
	creator: Creator[];
	locationTimeDisplay: string | null;
	campaign: {
		title: string | null;
		id: string;
		brandId: string;
		locations: {
			id: string;
			locationName: string | null;
		}[];
		market: string | null;
	}[];
	ttComments: null;
	tikTokPost: null;
	tikTokHandle: string[] | null;
	igViews: null;
	igPost: null | string;
	igLikes: null;
	igFollowersFromCreator: string[];
	ttFollowers: string[];
	ttLikes: null;
	ttShares: null;
	ttViews: null;
	headshotFromCreator: TableImage[];
	creatorIgHandle: string[] | null;
	confirmApplication: string;
	igEngagement: null | string;
	igComments: null;
	ttEngagement: null | string;
	postedDate: string | null;
	matchScore: string;
	locationMatchSore: number;
	influencerMatchScore: number;
	aestheticMatchScore: number;
	aestheticMatchScoreLogic: string;
	locationMatchScoreLogic: string;
	influencerMatchScoreLogic: string;
	actionDate: string | null;
}

export const http_getCampaignApplicationByEmail = async ({
	email,
	limit,
	status = "",
	orderBy = { actionDate: "desc" },
	page = 1,
}: {
	email: string;
	limit?: number;
	status?: string;
	page?: number;
	orderBy?: Partial<Record<keyof Application, "desc" | "asc">>;
}) => {
	const res = await atb.brand<CampaignApplicationType>(
		atbQuery(`
    query GetApplicationByEmail(
      $email: String
      $limit: JSON
      $status: String
      $orderBy: JSON
      $page: JSON
    ) {
      applications(
        _filter: {
          _and: [
            {
              _or: [
                { brandContactEmail: $email }
                { teamEmailString: { _in: [$email] } }
              ]
            }
            { status: { _in: [$status] } }
          ]
        }
        _order_by: $orderBy
        _page_size: $limit
        _page: $page
      ) {
        id
        reminderDate
        noShow
        status
        postedDate
        scheduled
        locationTimeDisplay
        matchScore
        locationMatchSore
        influencerMatchScore
        aestheticMatchScore
        aestheticMatchScoreLogic
        locationMatchScoreLogic
        influencerMatchScoreLogic
        creator {
          name
          firstName
          lastName
          phoneNumber
          emailAddress
          report
          targetId
          market
          creatorType
        }
        campaign {
          title
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
      }
    }
    `),
		{
			email,
			limit,
			status,
			orderBy: orderBy,
			page,
		}
	);
	return res.applications;
	// return res.applications.map((t) => ({ result: t }));
};
export const http_getTotalCampaignApplicationByEmail = async ({
	email,
	status = "",
}: {
	email: string;
	status?: string;
}) => {
	const res = await atb.brand<CampaignApplicationType>(
		atbQuery(`
    query GetApplicationByEmail(
      $email: String
      $status: String
    ) {
      applications(
        _filter: {
          _and: [
            {
              _or: [
                { brandContactEmail: $email }
                { teamEmailString: { _in: [$email] } }
              ]
            }
            { status: { _in: [$status] } }
          ]
        }
      ) {
        id
      }
    }
    `),
		{
			email,
			status: status === "All" ? "" : status,
		}
	);

	return res.applications.length;
};

export const http_acceptApplication = async (input: {
	applicationId: string;
	status: "Scheduling" | "Passed";
}) => {
	const res = await atb.brand<{ update_applications: { id: string }[] }>(
		atbQuery(`
			mutation ApproveApplication ($applicationId: String, $status: String) {
				update_applications (id: $applicationId, status: $status) {
					id
				}
			}
	`),
		input
	);

	return res;
};

export const http_sendReminderOnApplication = async (input: {
	applicationId: string;
}) => {
	const res = await atb.brand(
		atbQuery(`
			mutation SendApplicationDateReminder(
				$applicationId: String
				$reminderDate: String
			) {
				update_applications(id: $applicationId, reminderDate: $reminderDate) {
					id
				}
			}
		`),
		{
			...input,
			reminderDate: format(new Date(), "yyyy-MM-dd"),
		}
	);

	return res;
};
