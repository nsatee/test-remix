import { compact, uniq } from "lodash";
import { abbrState } from "../../utils/abbrState";
import { atb, atbQuery } from "../atb";
import { compactObject } from "../../utils/compactObject";
import { TableImage } from "../common.type";

export interface BrandListResponse {
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
export interface BrandData {
	id: string;
	name: null | string;
}

export type InsertBrandInput = {
	market: string[];
	name: string;
	contactPhoneNumber: string;
	group: string[];
	contactName: string;
	contactEmail: string;
	description: string;
	websiteLink: string;
	twitterLink: string;
	instagramLink: string;
	youTubeLink: string;
	tikTokLink: string;
	facebookLink: string;
	state: string[];
	businessType: string[];
	businessSubType: string[];
	image: { url: string }[];
	bannerImage: { url: string }[];
};

export interface InsertBrandResponse {
	insert_brands: InsertBrand[];
}

export interface InsertBrand {
	id: string;
}

export const http_getBrandByEmail = async ({ email }: { email: string }) => {
	const res = await atb.brand<{ brands: BrandData[] }>(
		atbQuery(`
    query GetBrands($email: String) {
      brands(
        _filter: {
          _or: [
            { contactEmail: $email }
            { teamEmailString: { _in: [$email] } }
          ]
        }
      ) {
        id
        name
      }
    }
  `),
		{ email }
	);
	return res.brands;
};

export const http_createBrand = async (input: InsertBrandInput) => {
	return await atb.brand<InsertBrandResponse>(
		atbQuery(`
  mutation InsertBrand(
		$market: [String]
		$name: String
		$contactPhoneNumber: String
		$group: [String]
		$contactName: String
		$contactEmail: String
		$description: String
		$websiteLink: String
		$twitterLink: String
		$instagramLink: String
		$youTubeLink: String
		$tikTokLink: String
		$facebookLink: String
		$state: [String]
		$account: String
    $businessType: [String]
    $businessSubType: [String]
    $image: [JSON]
    $bannerImage: [JSON]
	) {
		insert_brands(
			market: $market
			name: $name
			contactPhoneNumber: $contactPhoneNumber
			group: $group
			contactName: $contactName
			contactEmail: $contactEmail
			description: $description
			websiteLink: $websiteLink
			twitterLink: $twitterLink
			instagramLink: $instagramLink
			youTubeLink: $youTubeLink
			tikTokLink: $tikTokLink
			facebookLink: $facebookLink
			state: $state
			account: $account
      businessType: $businessType
      businessSubType: $businessSubType
      image: $image
      bannerImage: $bannerImage
		) {
			id
		}
	}
  `),
		{
			...input,
			account: "Active",
			state: uniq(
				compact(
					input.market.map((target) =>
						abbrState(target.split(",")?.[1]?.trim(), "name")
					)
				)
			),
		}
	);
};

export const http_getBrandDataForm = async (input: { brandId: string }) => {
	const res = await atb.brand<{ brands: Partial<InsertBrandInput>[] }>(
		atbQuery(`
		query GetBrandDataForm(
			$brandId: String
		) {
			brands(
				brandId: $brandId
			) {
				id
				market
				name
				contactPhoneNumber
				contactName
				contactEmail
				description
				websiteLink
				twitterLink
				instagramLink
				youTubeLink
				tikTokLink
				facebookLink
				state
				account
				businessType
				businessSubType
				image
				bannerImage
			}
		}
  `),
		input
	);

	return res;
};

export const http_updateBrandById = async (
	input: Partial<InsertBrandInput & { brandId: string }>
) => {
	return await atb.brand<InsertBrandResponse>(
		atbQuery(`
			mutation UpdateBrandById(
				$brandId: String
				$market: [String]
				$name: String
				$contactPhoneNumber: String
				$group: [String]
				$contactName: String
				$contactEmail: String
				$description: String
				$websiteLink: String
				$twitterLink: String
				$instagramLink: String
				$youTubeLink: String
				$tikTokLink: String
				$facebookLink: String
				$state: [String]
				$account: String
				$businessType: [String]
				$businessSubType: [String]
				$image: [JSON]
				$bannerImage: [JSON]
			) {
				update_brands(
					id: $brandId
					market: $market
					name: $name
					contactPhoneNumber: $contactPhoneNumber
					group: $group
					contactName: $contactName
					contactEmail: $contactEmail
					description: $description
					websiteLink: $websiteLink
					twitterLink: $twitterLink
					instagramLink: $instagramLink
					youTubeLink: $youTubeLink
					tikTokLink: $tikTokLink
					facebookLink: $facebookLink
					state: $state
					account: $account
					businessType: $businessType
					businessSubType: $businessSubType
					image: $image
					bannerImage: $bannerImage
				) {
					id
				}
			}
  `),
		compactObject({
			...input,
			account: "Active",
			state: uniq(
				compact(
					input.market?.map((target) =>
						abbrState(target.split(",")?.[1]?.trim(), "name")
					)
				)
			),
		})
	);
};

export const http_getBrandList = async (input: { email: string }) => {
	const res = await atb.brand<{ brands: BrandListResponse[] }>(
		atbQuery(
			`
			query GetBrands($email: String) {
				brands(
					_filter: {
						_or: [
							{ contactEmail: $email }
							{ teamEmailString: { _in: [$email] } }
						]
					}
				) {
					id
					name
					websiteLink
					description
					image
					bannerImage
					totalImpression
					averageEngagement
					campaigns {
						id
					}
				}
			}
		`
		),
		input
	);
	return res;
};
