import { IconHeart, IconMessage, IconShare3 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { SocialPost } from "../SocialPost";

interface TikTokEmbedResponseType {
	result: Result;
}

interface Result {
	likeCount: string;
	commentCount: string;
	shareCount: string;
	url: string;
	caption: string;
	video: Video;
	user: User;
}

interface User {
	username: string;
	url: string;
}

interface Video {
	src: string;
	poster: string;
}

export const useTiktokPost = ({ url }: { url?: string | null }) => {
	return useQuery(
		[url],
		async () => {
			try {
				const res = await axios.post<TikTokEmbedResponseType>(
					`https://social-scraper.deno.dev/tiktok/post`,
					{
						url,
					}
				);

				return res.data;
			} catch (error) {
				return null;
			}
		},
		{
			enabled: Boolean(url),
		}
	);
};
export const TikTokPost = ({
	url,
	compact,
}: {
	url: string;
	compact?: boolean;
}) => {
	const { data } = useTiktokPost({ url: url });

	if (!data?.result) return null;
	return (
		<SocialPost
			image={data.result.video.poster}
			name={data.result.user.username}
			caption={data.result.caption}
			compact={compact}
			stats={[
				{ icon: <IconHeart />, value: data.result?.likeCount },
				{ icon: <IconMessage />, value: data.result?.commentCount },
				{ icon: <IconShare3 />, value: data.result?.shareCount },
			]}
		/>
	);
};
