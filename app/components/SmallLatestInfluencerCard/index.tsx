import {
	Anchor,
	Avatar,
	Button,
	createStyles,
	Group,
	Stack,
	Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { intlUnit } from "../../utils/intlNumber";
import { Nullish } from "../../utils/utilityType";
import { HideOnEmpty } from "../HideOnEmpty";
import { InstagramPost, useGetInstagramPost } from "../InstagramPost";
import { TikTokPost, useTiktokPost } from "../TiktokPost";

const useStyles = createStyles((theme) => ({
	icon: {
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[3]
				: theme.colors.gray[5],
	},

	name: {},
}));

export type SmallLatestInfluencerCardProps = {
	thumbnail?: string;
	name: string;
	postedAt: Nullish<string>;
	instagramLink?: Nullish<string>;
	tiktokLink?: Nullish<string>;
	id: string;
};

export function SmallLatestInfluencerCard({
	thumbnail,
	name,
	postedAt,
	instagramLink,
	tiktokLink,
	id,
}: SmallLatestInfluencerCardProps) {
	const { classes } = useStyles();
	const { data: instagramData } = useGetInstagramPost({ url: instagramLink });
	const { data: tiktokPost } = useTiktokPost({ url: tiktokLink });
	return (
		<Group noWrap>
			<Avatar src={thumbnail} size={94} radius="md" />
			<div>
				{postedAt && (
					<Text fz="xs" tt="uppercase" fw={700} c="dimmed">
						{format(new Date(postedAt), "PP")}
					</Text>
				)}
				<Anchor
					fz="lg"
					fw={500}
					className={classes.name}
					component={Link}
					to={`/agent/influencer/${id}`}
				>
					{name}
				</Anchor>
				<HideOnEmpty component={Group} mt="xs">
					{instagramLink && (
						<Button
							size="xs"
							compact
							variant="gradient"
							leftIcon={
								instagramData?.result?.likeCount !== -1 && (
									<IconBrandInstagram size="1rem" />
								)
							}
							onClick={() => {
								modals.open({
									title: "Instagram post preview",
									children: (
										<Stack>
											<Anchor href={instagramLink} target="_blank">
												<InstagramPost url={instagramLink} compact />
											</Anchor>
											<Button
												component="a"
												href={instagramLink}
												target="_blank"
											>
												Visit the post
											</Button>
										</Stack>
									),
									size: "sm",
								});
							}}
						>
							{instagramData?.result?.likeCount !== -1 ? (
								`${intlUnit(instagramData?.result?.likeCount)} like`
							) : (
								<IconBrandInstagram size="1rem" />
							)}
						</Button>
					)}
					{tiktokLink && (
						<Button
							size="xs"
							compact
							variant="gradient"
							leftIcon={
								instagramData?.result?.likeCount !== -1 && (
									<IconBrandTiktok size="1rem" />
								)
							}
							onClick={() => {
								modals.open({
									title: "Tiktok post preview",
									children: (
										<Stack>
											<Anchor href={tiktokLink} target="_blank">
												<TikTokPost url={tiktokLink} compact />
											</Anchor>
											<Button component="a" href={tiktokLink} target="_blank">
												Visit the post
											</Button>
										</Stack>
									),
									size: "sm",
								});
							}}
						>
							{instagramData?.result?.likeCount !== -1 ? (
								`${tiktokPost?.result.likeCount} like`
							) : (
								<IconBrandTiktok size="1rem" />
							)}
						</Button>
					)}
				</HideOnEmpty>
			</div>
		</Group>
	);
}
