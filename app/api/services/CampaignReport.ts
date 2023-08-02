import axios from "axios";
import { compact, last } from "lodash";

import { atb, atbQuery } from "../../api/atb";
import { StatusEnum, TableImage } from "../../api/common.type";

export const http_getCampaignReportData = async (input: {
	campaignId: string;
}) => {
	const res = await atb.brand<GetReportDataResponse>(
		atbQuery(`
  query GetReportData($campaignId: String) {
    campaigns(id: $campaignId) {
      id
      title
      reportUpdated
			impressions
  		engagement
			totalLikes
			totalComments
			totalViews
			brandStory
			brandLogo
			reportIntro
			reportSummary
			reportIntro
			totalIgViews
			totalIgLikes
			totalIgComments
			totalTtLikes
			totalTtViews
			totalTtComments
			eventDate
    	timezone
    }
    
    applications(campaignIds: [$campaignId]) {
      id
      firstName
      lastName
      tikTokPost
      ttLikes
      ttShares
      ttComments
      igPost
			igViews
      igLikes
      igComments
			status
			headshotFromCreator
    }
  }
  `),
		input
	);

	return res;
};

export const http_getPostLikeData = async (shortcode: string) => {
	const options = {
		method: "GET",
		url: "https://instagram-scraper-2022.p.rapidapi.com/ig/likes/",
		params: {
			shortcode,
		},
		headers: {
			"X-RapidAPI-Key": "05cff2a703msh2b323e9a5a11b38p1d878djsnf87e615ac735",
			"X-RapidAPI-Host": "instagram-scraper-2022.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request<PostLikeResponse>(options);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const http_updateApplicationStats = async (input: {
	url: string;
	id: string;
}) => {
	const post = await http_getInstagramPostData(input.url);
	const likes = post?.data
		? post.data.items[0]?.like_and_view_counts_disabled
			? await http_getPostLikeData(post.data.items[0].code)
			: null
		: null;
	if (post) {
		await atb.brand(
			atbQuery(`
	    mutation UpdateApplicationStats(
	      $id: String,
	      $igLikes: Float,
	      $igComments: Float,
				$igViews: Float
				
	    ) {
	      update_applications(
	        id: $id,
	        igLikes: $igLikes,
	        igComments: $igComments
	        igViews: $igViews
					
	      ) {
	        id
	      }
	    }
	`),
			{
				id: input.id,
				igLikes:
					likes?.data?.data?.shortcode_media?.edge_liked_by?.count ||
					post?.data.items[0]?.like_count ||
					0,
				igComments: post?.data.items[0]?.comment_count || 0,
				igViews:
					post?.data.items[0]?.view_count ||
					post?.data.items[0]?.play_count ||
					0,
			}
		);
	}

	return post;
};

interface GetReportDataResponse {
	campaigns: CampaignReportData[];
	applications: ApplicationReport[];
}

export interface ApplicationReport {
	id: string;
	firstName?: string[];
	lastName?: string[];
	tikTokPost?: any;
	ttLikes?: number;
	ttShares?: number;
	ttComments?: number;
	igPost?: string;
	igLikes?: number;
	igViews?: number;
	igComments?: number;
	status: StatusEnum;
	headshotFromCreator: TableImage[];
}

export type CampaignReportData = {
	id: string;
	title: string;
	reportUpdated?: string | null;
	engagement?: string | null;
	impressions?: string | null;
	totalLikes?: string | null;
	totalViews?: string | null;
	totalComments?: string | null;
	brandStory: string | null;
	brandLogo: TableImage[] | null;
	reportSummary: string | null;
	reportIntro: string | null;
	totalIgViews: string | null;
	totalIgLikes: string | null;
	totalIgComments: string | null;
	totalTtLikes: string | null;
	totalTtViews: string | null;
	totalTtComments: string | null;
	eventDate: string | null;
	timezone: string | null;
};

export interface GetInstagramPostResponse {
	items: Item[];
	num_results: number;
	status: string;
}

interface Item {
	taken_at: number;
	pk: string;
	id: string;
	device_timestamp: number;
	media_type: number;
	code: string;
	client_cache_key: string;
	filter_type: number;
	is_unified_video: boolean;
	caption_is_edited: boolean;
	like_and_view_counts_disabled: boolean;
	commerciality_status: string;
	is_paid_partnership: boolean;
	is_visual_reply_commenter_notice_enabled: boolean;
	original_media_has_visual_reply_media: boolean;
	comment_likes_enabled: boolean;
	comment_threading_enabled: boolean;
	has_more_comments: boolean;
	max_num_visible_preview_comments: number;
	preview_comments: any[];
	can_view_more_preview_comments: boolean;
	comment_count: number;
	hide_view_all_comment_entrypoint: boolean;
	inline_composer_display_condition: string;
	inline_composer_imp_trigger_time: number;
	image_versions2: Imageversions2;
	original_width: number;
	original_height: number;
	user: User;
	can_viewer_reshare: boolean;
	like_count: number;
	has_liked: boolean;
	top_likers: any[];
	likers: Liker[];
	photo_of_you: boolean;
	is_organic_product_tagging_eligible: boolean;
	can_see_insights_as_brand: boolean;
	is_dash_eligible: number;
	video_dash_manifest: string;
	video_codec: string;
	number_of_qualities: number;
	video_versions: Videoversion[];
	has_audio: boolean;
	video_duration: number;
	view_count: number;
	play_count: number;
	caption: Caption;
	featured_products_cta?: any;
	can_viewer_save: boolean;
	is_in_profile_grid: boolean;
	profile_grid_control_enabled: boolean;
	organic_tracking_token: string;
	has_shared_to_fb: number;
	product_type: string;
	deleted_reason: number;
	integrity_review_decision: string;
	music_metadata?: any;
}

interface Caption {
	pk: string;
	user_id: number;
	text: string;
	type: number;
	created_at: number;
	created_at_utc: number;
	content_type: string;
	status: string;
	bit_flags: number;
	did_report_as_spam: boolean;
	share_enabled: boolean;
	user: User2;
	is_covered: boolean;
	media_id: string;
	private_reply_status: number;
}

interface User2 {
	pk: number;
	username: string;
	full_name: string;
	is_private: boolean;
	profile_pic_url: string;
	profile_pic_id: string;
	is_verified: boolean;
	follow_friction_type: number;
	growth_friction_info: Growthfrictioninfo;
}

interface Videoversion {
	type: number;
	width: number;
	height: number;
	url: string;
	id: string;
}

interface Liker {
	pk: number;
	username: string;
	full_name: string;
	is_private: boolean;
	profile_pic_url: string;
	is_verified: boolean;
	follow_friction_type: number;
	growth_friction_info: Growthfrictioninfo;
	profile_pic_id?: string;
}

interface User {
	pk: number;
	username: string;
	full_name: string;
	is_private: boolean;
	profile_pic_url: string;
	profile_pic_id: string;
	friendship_status: Friendshipstatus;
	is_verified: boolean;
	follow_friction_type: number;
	growth_friction_info: Growthfrictioninfo;
	has_anonymous_profile_picture: boolean;
	is_unpublished: boolean;
	is_favorite: boolean;
	latest_reel_media: number;
	has_highlight_reels: boolean;
	account_badges: any[];
}

interface Growthfrictioninfo {
	has_active_interventions: boolean;
	interventions: any[];
}

interface Friendshipstatus {
	following: boolean;
	outgoing_request: boolean;
	is_bestie: boolean;
	is_restricted: boolean;
	is_feed_favorite: boolean;
}

interface Imageversions2 {
	candidates: Candidate[];
	additional_candidates: Additionalcandidates;
}

interface Additionalcandidates {
	igtv_first_frame: Candidate;
	first_frame: Candidate;
}

interface Candidate {
	width: number;
	height: number;
	url: string;
	scans_profile: string;
}

export const http_getInstagramPostData = async (url: string) => {
	const { pathname } = new URL(url);
	const shortcode = last(compact(pathname.split("/")));
	const options = {
		method: "GET",
		url: "https://instagram-scraper-2022.p.rapidapi.com/ig/post_info_v2/",
		params: {
			shortcode,
		},
		headers: {
			"X-RapidAPI-Key": "05cff2a703msh2b323e9a5a11b38p1d878djsnf87e615ac735",
			"X-RapidAPI-Host": "instagram-scraper-2022.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request<GetInstagramPostResponse>(options);
		return response;
	} catch (error) {
		console.error(`Failed to get data from ${url}`);
	}
};

interface PostLikeResponse {
	data: Data;
}

interface Data {
	shortcode_media: Shortcodemedia;
}

interface Shortcodemedia {
	id: string;
	shortcode: string;
	edge_liked_by: Edgelikedby;
}

interface Edgelikedby {
	count: number;
	edges: Edge[];
	page_info: Pageinfo;
}

interface Pageinfo {
	end_cursor: string;
	has_next_page: boolean;
}

interface Edge {
	node: Node;
}

interface Node {
	id: string;
	username: string;
	full_name: string;
	is_private: boolean;
	is_verified: boolean;
	profile_pic_url: string;
	followed_by_viewer: boolean;
	requested_by_viewer: boolean;
}
