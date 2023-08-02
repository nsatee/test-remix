import {
	Anchor,
	AspectRatio,
	Box,
	Flex,
	Group,
	SimpleGrid,
	Stack,
	Text,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { intlUnit } from "../../utils/intlNumber";

interface TikTokUserResponse {
	user_info: Userinfo;
	video_list: Videolist[];
	profile_url: string;
}

interface Videolist {
	coverUrl: string;
	desc: string;
	dynamicCoverUrl: string;
	height: number;
	id: string;
	originCoverUrl: string;
	playAddr: string;
	playCount: number;
	privateItem: boolean;
	ratio: string;
	warnInfoList: any[];
	width: number;
}

interface Userinfo {
	avatarThumbUrl: string;
	code: number;
	customErrorCode: number;
	followerCount: number;
	followingCount: number;
	heartCount: number;
	id: string;
	nickname: string;
	privateAccount: boolean;
	signature: string;
	uniqueId: string;
	verified: boolean;
}

export const TikTokProfile = ({ url }: { url?: string | null }) => {
	const { data } = useQuery(
		[url],
		async () => {
			if (!url) return null;
			const res = await axios.post<TikTokUserResponse>(
				"https://social-scrapper.onrender.com/tiktok/user",
				{
					url: url,
				}
			);
			return await res.data;
		},
		{
			enabled: Boolean(url),
		}
	);
	console.log(data);
	if (!url) return null;
	return (
		<Stack>
			<Text size="xl" fw="bold" ta="center">
				Latest TikTok post
			</Text>
			<Group
				sx={(theme) => ({
					background: theme.colors.gray[0],
					padding: theme.spacing.xs,
					borderRadius: theme.radius.md,
				})}
			>
				<AspectRatio
					ratio={1}
					w="100%"
					maw="60px"
					sx={(theme) => ({
						borderRadius: theme.radius.sm,
						overflow: "hidden",
						flex: 1,
					})}
				>
					<img src={data?.user_info.avatarThumbUrl} />
				</AspectRatio>
				<div>
					<Anchor
						fw="bold"
						href={`https://www.tiktok.com/@${data?.user_info.uniqueId}`}
						target="_blank"
					>
						@{data?.user_info.uniqueId}
					</Anchor>
					<Group>
						<Text size="sm">
							<Text fw="500" span>
								Followers:{" "}
							</Text>
							{intlUnit(data?.user_info.followerCount)}
						</Text>
						<Text>|</Text>
						<Text size="sm">
							<Text fw="500" span>
								Likes:{" "}
							</Text>
							{intlUnit(data?.user_info.heartCount)}
						</Text>
					</Group>
				</div>
			</Group>
			<SimpleGrid
				cols={5}
				spacing="lg"
				breakpoints={[
					{ maxWidth: "lg", cols: 4, spacing: "md" },
					{ maxWidth: "md", cols: 3, spacing: "sm" },
					{ maxWidth: "sm", cols: 2, spacing: "sm" },
					{ maxWidth: "xs", cols: 1, spacing: "sm" },
				]}
			>
				{data?.video_list.map((post) => (
					<Box
						component={"a"}
						w="100%"
						key={post.id}
						href={`https://www.tiktok.com/@${data.user_info.uniqueId}/video/${post.id}`}
						target="_blank"
						sx={(theme) => ({ textDecoration: "none", color: theme.black })}
						pos="relative"
					>
						<Stack spacing={"xs"}>
							<Box
								pos="relative"
								sx={(theme) => ({
									borderRadius: theme.radius.sm,
									overflow: "hidden",
									flex: 1,
									boxShadow: theme.shadows.sm,
									transform: `scale(1)`,
									transition: "100ms",
									"&:hover": {
										transform: `scale(1.02)`,
										boxShadow: theme.shadows.md,
									},
								})}
							>
								<AspectRatio ratio={3 / 4} w="100%" pos="relative">
									<img src={post.coverUrl} />
								</AspectRatio>
								<Flex
									w="100%"
									pos="absolute"
									bottom={0}
									left={0}
									h="100%"
									sx={(theme) => ({
										backgroundColor: "rgb(0,0,0)",
										background:
											"linear-gradient(3deg, rgba(0,0,0,0.80015756302521) 0%, rgba(255,255,255,0) 48%, rgba(255,255,255,0) 100%)",
										zIndex: 2,
										color: theme.white,
										padding: theme.spacing.xs,
									})}
									align={"end"}
								>
									<Group spacing={"xs"}>
										<IconEye />
										<Text size="sm">{intlUnit(post.playCount)}</Text>
									</Group>
								</Flex>
							</Box>
						</Stack>
					</Box>
				))}
			</SimpleGrid>
		</Stack>
	);
};
