import { atb, atbQuery } from "../../api/atb";

export const http_getBrandReport = async (input: GetBrandReportInput) => {
	const res = await atb.brand<GetBrandReportResponse>(
		atbQuery(`
    query GetBrandReport($id: String, $start: String, $end: String) {
      metrics (
				_filter: {
          _and: [
            { brandRecordId: {_eq: $id} },
            { dateFilterPointer: {_gte: $start} },
            { dateFilterPointer: {_lte: $end} }
          ]
        }
        _order_by: {
          date: "asc",
        }
      ) {
        id
        total
        date
				dateOfMonth
				month
				year
        metricsType {
          name
        }
        metricsChannel {
          name
        }
        year
        brands {
          name
        }
      }

			brands(id: $id) {
				name
			}

      metricsChannel {
        name
      }

      metricsType {
        name
      }
    }
  `),
		input
	);

	return res;
};

export type GetBrandReportInput = {
	id: string;
	start: string;
	end: string;
};

export type GetBrandReportResponse = {
	metrics: Metric[];
	metricsChannel: MetricsChannelElement[];
	metricsType: MetricsTypeElement[];
	brands: { name: string }[];
};

export type Metric = {
	id: string;
	total: number;
	date: Date;
	metricsType: Brand[];
	metricsChannel: MetricsChannelElement[];
	year: string;
	dateOfMonth: string;
	month: string;
	brands: Brand[];
};

export type Brand = {
	name: MetricsTypeName;
};

export type MetricsTypeElement = {
	name: MetricsTypeName;
};

export type MetricsChannel = {
	metricsChannel: MetricsChannelElement[];
};

export type MetricsChannelElement = {
	name: MetricsChannelName;
};

export enum MetricsChannelName {
	TikTok = "TikTok",
	Facebook = "Facebook",
	Email = "Email",
	Shopify = "Shopify",
	Instagram = "Instagram",
}

export enum MetricsTypeName {
	Reach = "Reach",
	Sales = "Sales",
	Visits = "Visits",
}
