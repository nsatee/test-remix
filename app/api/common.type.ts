/**
 * - **Assessing**: process is pending by agent.
 * - **Scheduling**: creator need to schedule the time.
 * - **Confirmed**: when creator is scheduled but still waiting for agent.
 * - **Completed**: coming soon.
 * - **Posted**: creator finished their content and sent prove to the agent.
 * - **Passed**: creator is rejected by the agent
 */

export type StatusEnum =
	// process is pending by agent
	| "Assessing"
	// creator need to schedule the time
	| "Scheduling"
	// when creator is scheduled but still waiting for agent
	| "Confirmed"
	// coming soon
	| "Completed"
	// creator finished their content and sent prove to the agent
	| "Posted"
	// creator is rejected by the agent
	| "Passed"
	| "Can't Attend"
	| "No Show";

export enum ImageType {
	ImageJPEG = "image/jpeg",
	ImagePNG = "image/png",
	ImageWebp = "image/webp",
}

export interface ImageThumbnails {
	small: ImageThumbnailData;
	large: ImageThumbnailData;
	full: ImageThumbnailData;
}

export type ImageThumbnailData = {
	url: string;
	width: number;
	height: number;
};

export interface TableImage {
	id: string;
	width: number;
	height: number;
	url: string;
	filename: string;
	size: number;
	type: ImageType;
	thumbnails: ImageThumbnails;
}

export type CampaignStatus =
	| "Not Started"
	| "In Progress"
	| "In Review"
	| "Approved"
	| "Published"
	| "Unlisted";

export const AIRTABLE_DATE_FORMAT = "yyyyMMdd";
