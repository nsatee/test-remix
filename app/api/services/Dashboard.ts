import { format, sub } from "date-fns";
import { atb, atbQuery } from "../atb";
import {
	AIRTABLE_DATE_FORMAT,
	CampaignStatus,
	StatusEnum,
	TableImage,
} from "../common.type";

export const http_getBrandApplicationStats = async ({
	email,
}: {
	email?: string;
}) => {
	const application = await atb.brand<{
		applications: CreatorTotalData[];
	}>(
		atbQuery(`
    query GetApplicationStats($email: String) {
      applications(
        _filter: {
          _or: [
            { brandContactEmail: $email }
            { teamEmailString: { _in: [$email] } }
          ]
        }
        _order_by: { postedDate: "asc" }
      ) {
        id
        status
      }
    }   
    `),
		{
			email,
		}
	);
	const pitch = await atb.creator<{
		collabs: CreatorTotalData[];
	}>(
		atbQuery(`
    query GetCollabStats($email: String) {
      collabs(
        _filter: {
          _or: [
            { contactEmailFromAllBrands: $email }
            { teamEmailString: { _in: [$email] } }
          ]
        }
      ) {
        id
        status
      }
    }
    
    `),
		{ email }
	);
	return [...application.applications, ...pitch.collabs];
};

export const http_getLatestCollabs = async ({ email }: { email?: string }) => {
	const res = await atb.brand<LatestApplicationType>(
		atbQuery(`
    query GetLatestPostedApplicationByEmail($email: String) {
      applications(
        _filter: {
          _and: [
            {
              _or: [
                { brandContactEmail: $email }
                { teamEmails: { _in: [$email] } }
              ]
            }
            { status: "Posted", postedDate: { _ne: "" } }
          ]
        }
        _order_by: { actionDate: "desc" }
        _page_size: 8
      ) {
        id
        status
        postedDate
        tikTokPost
        igPost
        creatorId
        creator {
          name
          firstName
          lastName
          targetId
          market
          headshot
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
      }
    }
  `),
		{
			email,
		}
	);

	return res.applications || [];
};

export const http_getBrandCampaignStats = async ({
	email,
}: {
	email?: string;
}) => {
	const campaignStats = async () =>
		await atb.brand<CampaignStats>(
			atbQuery(`
      query GetCampaignTotal($email: String) {
        campaigns(
          _filter: {
            _or: [
              { brandContactEmail: $email }
              { teamEmailString: { _in: [$email] } }
            ]
          }
        ) {
          id
          status
        }
      }      
    `),
			{ email }
		);

	const brandStats = async () =>
		await atb.brand<BrandStats>(
			atbQuery(`
      query GetBrandStats($email: String) {
        brands(
          _filter: {
            _or: [{ contactEmail: $email }, { teamEmailString: { _in: [$email] } }]
          }
        ) {
          totalImpression
          averageEngagement
        }
      }    
      `),
			{ email }
		);
	const res = await Promise.all([campaignStats(), brandStats()]);
	return {
		campaignStats: res[0].campaigns,
		brandStats: res[1].brands,
	};
};

export const http_getBrandChartData = async ({
	email,
	duration,
}: {
	email: string;
	duration?: number;
}) => {
	const today = new Date();
	const res = await atb.brand<BrandChartType>(
		atbQuery(`
    query GetMetricData($email: String, $startDate: Int, $endDate: Int) {
      applications(
        _filter: {
          _and: [
            { createdInSecond: { _gte: $startDate } }
            { createdInSecond: { _lt: $endDate } }
          ]
          _or: [{ brandContactEmail: $email }, { teamEmails: { _in: [$email] } }]
        }
      ) {
        created
        createdInSecond
        brandContactEmail
        igEngagement
        igViews
      }
    }
  `),
		{
			email,
			startDate: +format(sub(today, { days: duration }), AIRTABLE_DATE_FORMAT),
			endDate: +format(today, AIRTABLE_DATE_FORMAT),
		}
	);

	return res.applications;
};

// types

export type BrandChartType = {
	applications: BrandChartApplication[];
};

export type BrandChartApplication = {
	created: string;
	createdInSecond: string;
	brandContactEmail: string[];
	igEngagement: string;
	igViews: number | null;
};

export type CreatorTotalData = { id: string; status: StatusEnum };
export interface LatestApplicationType {
	applications?: ApplicationsEntity[] | null;
}

export interface LatestApplicationType {
	applications?: ApplicationsEntity[] | null;
}
export interface ApplicationsEntity {
	id: string;
	status: string;
	postedDate?: string | null;
	tikTokPost?: null | string;
	igPost: string;
	creator?: CreatorEntity[] | null;
	campaign?: CampaignEntity[] | null;
	creatorId: string;
}
export interface CreatorEntity {
	name: string;
	firstName?: string | null;
	lastName?: string | null;
	targetId: string;
	market: string;
	headshot?: TableImage[] | null;
}

export interface CampaignEntity {
	title: string;
	id: string;
	brandId?: string[] | null;
	locations?: LocationsEntity[] | null;
}
export interface LocationsEntity {
	id: string;
	locationName: string;
}

export type BrandStats = {
	brands: {
		totalImpression: string;
		averageEngagement: string;
	}[];
};
export type CampaignStats = {
	campaigns: { id: string; status: CampaignStatus }[];
};
