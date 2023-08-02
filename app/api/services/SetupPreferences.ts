import { atb, atbQuery } from "../atb";
import { Membership } from "./SearchInfluencer";

export type CreatorTier =
	| "Growth"
	| "Scale"
	| "Tier I"
	| "Tier II"
	| "Tier III";

export interface SetupPreferenceInputType {
	id: string;
	membership: Membership;
	type: string[];
	firstName: string;
	lastName: string;
	emailAddress: string;
	gender: string;
	expertise: string;
	creatorType: string[];
	fitnessActivities: string[];
	fitnessAffiliates: string[];
	fitnessCredentials: string[];
	market: string;
	otherPlaces: string;
	phoneNumber: string;
	audienceSize: string;
	instagramHandle: string;
	igFollowers: number;
	tikTokHandle: string;
	ttFollowers: number;
	youTubeHandle: string;
	ytFollowing: number;
	twitterHandle: string;
	twitterFollowers: number;
	pinterestHandle: string;
	pinterestFollowers: number;
	facebookHandle: string;
	fbFollower: number;
	age: string;
	lowPayRate: number;
	preferredPayRateVideo: number;
	preferredPayRateImages: number;
	martialStatus: string;
	ethnicity: string[];
	dreamBrands: string;
	campaignTypes: string[];
	identity: string[];
	goal: string;
	name: string;
	headshot: { url: string }[] | null;
	account: boolean | null;
	onboarded: boolean | null;
	status: string;
	state: string[];
	tier: CreatorTier[] | null;
	renewalDate: string | null;
}

export const http_createYourReferences = async (
	input: SetupPreferenceInputType
) => {
	await atb.creator(
		atbQuery(`
mutation CreateNewPreference(
$type: [String]
$firstName: String
$lastName: String
$emailAddress: String
$gender: String
$expertise: String
$creatorType: [String]
$fitnessActivities: [String]
$fitnessAffiliates: [String]
$fitnessCredentials: [String]
$market: String
$otherPlaces: String
$phoneNumber: String
$audienceSize: String
$instagramHandle: String
$igFollowers: Float
$tikTokHandle: String
$ttFollowers: Float
$youTubeHandle: String
$ytFollowing: Float
$twitterHandle: String
$twitterFollowers: Float
$pinterestHandle: String
$pinterestFollowers: Float
$facebookHandle: String
$fbFollower: Float
$age: String
$lowPayRate: Float
$preferredPayRateVideo: Float
$preferredPayRateImages: Float
$martialStatus: String
$ethnicity: [String]
$dreamBrands: String
$campaignTypes: [String]
$identity: [String]
$goal: String
$name: String
$status: String
$membership: String
$account: Boolean
$onboarded: Boolean
$state: [String]
$headshot: [JSON]
) {
insert_creators(
	type: $type
	name: $name
	firstName: $firstName
	lastName: $lastName
	emailAddress: $emailAddress
	gender: $gender
	expertise: $expertise
	creatorType: $creatorType
	fitnessActivities: $fitnessActivities
	fitnessAffiliates: $fitnessAffiliates
	fitnessCredentials: $fitnessCredentials
	market: $market
	otherPlaces: $otherPlaces
	phoneNumber: $phoneNumber
	audienceSize: $audienceSize
	instagramHandle: $instagramHandle
	igFollowers: $igFollowers
	tikTokHandle: $tikTokHandle
	ttFollowers: $ttFollowers
	youTubeHandle: $youTubeHandle
	ytFollowing: $ytFollowing
	twitterHandle: $twitterHandle
	twitterFollowers: $twitterFollowers
	pinterestHandle: $pinterestHandle
	pinterestFollowers: $pinterestFollowers
	facebookHandle: $facebookHandle
	fbFollower: $fbFollower
	age: $age
	lowPayRate: $lowPayRate
	preferredPayRateVideo: $preferredPayRateVideo
	preferredPayRateImages: $preferredPayRateImages
	martialStatus: $martialStatus
	ethnicity: $ethnicity
	dreamBrands: $dreamBrands
	campaignTypes: $campaignTypes
	identity: $identity
	goal: $goal
	status: $status
	membership: $membership
	account: $account
	onboarded: $onboarded
	state: $state
	headshot: $headshot
) {
	id
}
}
`),
		input
	);
};

export const http_updateYourReferences = async (
	input: SetupPreferenceInputType
) => {
	const updatePreferenceQuery = atbQuery(`
	mutation UpdateNewPreference(
		$id: String
		$type: [String]
		$firstName: String
		$lastName: String
		$emailAddress: String
		$gender: String
		$expertise: String
		$creatorType: [String]
		$fitnessActivities: [String]
		$fitnessAffiliates: [String]
		$fitnessCredentials: [String]
		$market: String
		$otherPlaces: String
		$phoneNumber: String
		$audienceSize: String
		$instagramHandle: String
		$igFollowers: Float
		$tikTokHandle: String
		$ttFollowers: Float
		$youTubeHandle: String
		$ytFollowing: Float
		$twitterHandle: String
		$twitterFollowers: Float
		$pinterestHandle: String
		$pinterestFollowers: Float
		$facebookHandle: String
		$fbFollower: Float
		$age: String
		$lowPayRate: Float
		$preferredPayRateVideo: Float
		$preferredPayRateImages: Float
		$martialStatus: String
		$ethnicity: [String]
		$dreamBrands: String
		$campaignTypes: [String]
		$identity: [String]
		$goal: String
		$name: String
		$status: String
		$membership: String
		$account: Boolean
		$onboarded: Boolean
		$state: [String]
		$headshot: [JSON]
	) {
		update_creators(
			type: $type
			name: $name
			firstName: $firstName
			lastName: $lastName
			emailAddress: $emailAddress
			gender: $gender
			expertise: $expertise
			creatorType: $creatorType
			fitnessActivities: $fitnessActivities
			fitnessAffiliates: $fitnessAffiliates
			fitnessCredentials: $fitnessCredentials
			market: $market
			otherPlaces: $otherPlaces
			phoneNumber: $phoneNumber
			audienceSize: $audienceSize
			instagramHandle: $instagramHandle
			igFollowers: $igFollowers
			tikTokHandle: $tikTokHandle
			ttFollowers: $ttFollowers
			youTubeHandle: $youTubeHandle
			ytFollowing: $ytFollowing
			twitterHandle: $twitterHandle
			twitterFollowers: $twitterFollowers
			pinterestHandle: $pinterestHandle
			pinterestFollowers: $pinterestFollowers
			facebookHandle: $facebookHandle
			fbFollower: $fbFollower
			age: $age
			lowPayRate: $lowPayRate
			preferredPayRateVideo: $preferredPayRateVideo
			preferredPayRateImages: $preferredPayRateImages
			martialStatus: $martialStatus
			ethnicity: $ethnicity
			dreamBrands: $dreamBrands
			campaignTypes: $campaignTypes
			identity: $identity
			goal: $goal
			id: $id
			status: $status
			membership: $membership
			account: $account
			onboarded: $onboarded
			state: $state
			headshot: $headshot
		) {
			id
		}
	}
`);
	const res = await atb.creator(updatePreferenceQuery, {
		...input,
		id: input.id,
	});
	return res;
};
