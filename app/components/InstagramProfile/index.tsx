import {
	Anchor,
	AspectRatio,
	Badge,
	Box,
	Flex,
	Group,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import { IconEye, IconHeart, IconMessageCircle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { compact, last } from "lodash";
import { cloneElement, PropsWithChildren, ReactNode } from "react";

import { intlUnit } from "../../utils/intlNumber";

interface InstagramFeed {
	context: Context;
}

interface Context {
	followers_count: number;
	full_name: string;
	graphql_media: Graphqlmedia[];
	has_public_story: boolean;
	is_verified: boolean;
	owner_id: number;
	posts_count: number;
	profile_link: string;
	profile_link_ios: string;
	profile_pic_url: string;
	pronouns: any[];
	request_id: string;
	type: string;
	username: string;
	verified: boolean;
}

interface Graphqlmedia {
	shortcode_media: Shortcodemedia;
}

interface Shortcodemedia {
	__typename: string;
	id: string;
	shortcode: string;
	commenter_count: number;
	dimensions: Dimensions;
	display_url: string;
	display_resources: Displayresource[];
	is_video: boolean;
	title?: string;
	product_type?: string;
	video_url?: string;
	video_view_count?: number;
	clips_music_attribution_info?: Clipsmusicattributioninfo;
	media_overlay_info?: any;
	sharing_friction_info: Sharingfrictioninfo;
	owner: Owner;
	taken_at_timestamp: number;
	edge_media_to_caption: Edgemediatocaption;
	edge_media_to_sponsor_user: Edgemediatosponsoruser;
	is_affiliate: boolean;
	is_paid_partnership: boolean;
	like_and_view_counts_disabled: boolean;
	media_preview?: string;
	location?: any;
	edge_media_to_comment: Edgefollowedby;
	edge_liked_by: Edgefollowedby;
	coauthor_producers: Coauthorproducer[];
	pinned_for_users: any[];
	edge_sidecar_to_children?: Edgesidecartochildren;
}

interface Edgesidecartochildren {
	edges: Edge4[];
}

interface Edge4 {
	node: Node4;
}

interface Node4 {
	__typename: string;
	id: string;
	shortcode: string;
	commenter_count: number;
	dimensions: Dimensions;
	display_url: string;
	display_resources: Displayresource[];
	is_video: boolean;
	media_overlay_info?: any;
	sharing_friction_info: Sharingfrictioninfo;
}

interface Coauthorproducer {
	id: string;
	is_verified: boolean;
	profile_pic_url: string;
	username: string;
}

interface Edgemediatosponsoruser {
	edges: any[];
}

interface Edgemediatocaption {
	edges: Edge3[];
}

interface Edge3 {
	node: Node3;
}

interface Node3 {
	text: string;
}

interface Owner {
	id: string;
	profile_pic_url: string;
	username: string;
	followed_by_viewer: boolean;
	has_public_story: boolean;
	is_private: boolean;
	is_unpublished: boolean;
	is_verified: boolean;
	edge_followed_by: Edgefollowedby;
	edge_owner_to_timeline_media: Edgeownertotimelinemedia;
	edge_owner_to_timeline_video_media: Edgeownertotimelinevideomedia;
}

interface Edgeownertotimelinevideomedia {
	edges: Edge2[];
}

interface Edge2 {
	node: Node2;
}

interface Node2 {
	accessibility_caption?: any;
	media_overlay_info?: any;
	permalink: string;
	shortcode: string;
	thumbnail_src: string;
}

interface Edgeownertotimelinemedia {
	count: number;
	edges: Edge[];
}

interface Edge {
	node: Node;
}

interface Node {
	id: string;
	thumbnail_src: string;
	thumbnail_resources: Displayresource[];
}

interface Edgefollowedby {
	count: number;
}

interface Sharingfrictioninfo {
	should_have_sharing_friction: boolean;
	bloks_app_url?: any;
}

interface Clipsmusicattributioninfo {
	artist_name: string;
	song_name: string;
	uses_original_audio: boolean;
	should_mute_audio: boolean;
	should_mute_audio_reason: string;
	audio_id: string;
}

interface Displayresource {
	config_width: number;
	config_height: number;
	src: string;
}

interface Dimensions {
	height: number;
	width: number;
}

const RecentPostStatsItem = ({
	children,
	icon,
}: PropsWithChildren<{ icon: ReactNode }>) => {
	return (
		<Badge
			pl="0"
			leftSection={
				<ThemeIcon size="md" radius={"xl"} top="1px" pos="relative">
					<>
						{cloneElement(icon as any, {
							size: "1rem",
						})}
					</>
				</ThemeIcon>
			}
			size="lg"
			pt="0"
			sx={{ border: 0 }}
		>
			<>{children}</>
		</Badge>
	);
};
export const InstagramProfile = ({ url }: { url?: string | null }) => {
	// const ref = useRef<HTMLIFrameElement>(null);
	const { data } = useQuery(
		[url],
		async () => {
			if (!url) return null;
			const { pathname } = new URL(url);
			const username = last(compact(pathname.split("/")));
			const res = await axios.post<InstagramFeed>(
				"https://social-scrapper.onrender.com/ig/user",
				{
					url: `https://www.instagram.com/${username}/embed`,
				}
			);
			return await res.data;
		},
		{
			enabled: Boolean(url),
		}
	);

	if (!url) return null;
	return (
		<Stack>
			<Text size="xl" fw="bold" ta="center">
				Latest instagram post
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
					<img src={data?.context.profile_pic_url} crossOrigin="anonymous" />
				</AspectRatio>
				<div>
					<Anchor
						fw="bold"
						href={`https://instagram.com/${data?.context.username}`}
						target="_blank"
					>
						@{data?.context.username}
					</Anchor>
					<Group>
						<Text size="sm">
							<Text fw="500" span>
								Followers:{" "}
							</Text>
							{intlUnit(data?.context.followers_count)}
						</Text>
						<Text>|</Text>
						<Text size="sm">
							<Text fw="500" span>
								Posts:{" "}
							</Text>
							{intlUnit(data?.context.posts_count)}
						</Text>
					</Group>
				</div>
			</Group>
			<SimpleGrid
				cols={3}
				spacing="lg"
				breakpoints={[
					{ maxWidth: "62rem", cols: 2, spacing: "md" },
					{ maxWidth: "36rem", cols: 1, spacing: "sm" },
				]}
			>
				{data?.context.graphql_media.map((post) => (
					<Box
						component={"a"}
						w="100%"
						key={post.shortcode_media.display_url}
						href={`https://instagram.com/p/${post.shortcode_media.shortcode}`}
						target="_blank"
						sx={{ textDecoration: "none" }}
						pos="relative"
					>
						<AspectRatio
							ratio={1}
							w="100%"
							sx={(theme) => ({
								borderRadius: theme.radius.sm,
								overflow: "hidden",
								flex: 1,
								boxShadow: theme.shadows.sm,
							})}
						>
							<img
								src={post.shortcode_media.display_url}
								crossOrigin="anonymous"
							/>
						</AspectRatio>
						<Flex pos="absolute" bottom={"8px"} left="8px" gap="xs">
							<RecentPostStatsItem icon={<IconHeart />}>
								{intlUnit(post.shortcode_media.edge_liked_by.count)}
							</RecentPostStatsItem>
							<RecentPostStatsItem icon={<IconMessageCircle />}>
								{intlUnit(post.shortcode_media.edge_media_to_comment.count)}
							</RecentPostStatsItem>
							{post.shortcode_media.video_view_count && (
								<RecentPostStatsItem icon={<IconEye />}>
									{intlUnit(post.shortcode_media.video_view_count)}
								</RecentPostStatsItem>
							)}
						</Flex>
					</Box>
				))}
			</SimpleGrid>
		</Stack>
	);
};
