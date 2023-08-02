import "react-lazy-load-image-component/src/effects/blur.css";

import {
	Anchor,
	AspectRatio,
	Avatar,
	Badge,
	Box,
	Divider,
	Flex,
	Group,
	Paper,
	Stack,
	Text,
} from "@mantine/core";
import { IconAward, IconDiscountCheck } from "@tabler/icons-react";
import { compact, isEmpty } from "lodash";
import { Link } from "react-router-dom";

import {
	CreatorMarketPlace,
	Membership,
} from "../../api/services/SearchInfluencer";
import { fullname } from "../../utils/fullname";
import { parseCurrency } from "../../utils/parseCurrency";
import { HideOnEmpty } from "../HideOnEmpty";
import { LimitTotalRendering } from "../LimitTotalRendering";
import { LazyImage } from "../LazyImage";

type InfluencerDetailCardProps = {
	influencer: CreatorMarketPlace;
};

export function InfluencerDetailCard({
	influencer,
}: InfluencerDetailCardProps) {
	const items = compact([
		{
			value: influencer.preferredPayRateImages,
			label: "Image rate",
		},
		{
			value: influencer.preferredPayRateVideo,
			label: "Video rate",
		},
	]).map((stat) =>
		stat ? (
			<div key={stat.label}>
				<Text
					ta="center"
					fz="lg"
					fw={500}
					color={!stat.value ? "dimmed" : undefined}
				>
					{stat.value ? parseCurrency(stat.value) : "N/A"}
				</Text>
				<Text ta="center" fz="sm" c="dimmed">
					{stat.label}
				</Text>
			</div>
		) : null
	);

	return (
		<Paper radius={"md"} sx={{ overflow: "hidden" }} withBorder>
			<AspectRatio ratio={1} pos="relative">
				<Flex sx={{ flex: 1 }} align="flex-end !important">
					<LazyImage
						placeholderSrc={influencer.headshot?.[0]?.thumbnails?.small?.url}
						src={influencer.headshot?.[0]?.thumbnails?.large?.url}
					/>
					<AspectRatio ratio={1} pos="absolute" />
					<HideOnEmpty
						component={Group}
						p="sm"
						w="100%"
						spacing={"xs"}
						pos="absolute"
					>
						{influencer.top && (
							<Badge
								tt={"capitalize"}
								leftSection={
									<Avatar size={24} radius="xl" variant="light" color="blue">
										<IconAward size={14} />
									</Avatar>
								}
								pl={0}
								size="lg"
								variant="filled"
								sx={(theme) => ({
									boxShadow: theme.shadows.md,
								})}
							>
								Top influencer
							</Badge>
						)}
						{influencer?.membership === Membership.VerifiedMember && (
							<Badge
								tt={"capitalize"}
								leftSection={
									<Avatar size={24} radius="xl" variant="light" color="green">
										<IconDiscountCheck size={14} />
									</Avatar>
								}
								pl={0}
								size="lg"
								variant="filled"
								color="green"
								sx={(theme) => ({
									boxShadow: theme.shadows.md,
								})}
							>
								Verified
							</Badge>
						)}
					</HideOnEmpty>
				</Flex>
			</AspectRatio>
			<Box p="sm">
				<Anchor
					sx={{ display: "block" }}
					ta="center"
					fz="lg"
					fw={600}
					component={Link}
					to={`/agent/influencer/${influencer.id}`}
				>
					{fullname(influencer.firstName, influencer.lastName, influencer.name)}
				</Anchor>
				<Text ta="center" fz="sm" c="dimmed">
					{influencer.market}
				</Text>
				<Stack>
					<Group mt="md" position="center" spacing={30}>
						{items}
					</Group>
				</Stack>
			</Box>
			<Box p="sm">
				{!isEmpty(influencer?.creatorType) && (
					<>
						<Divider my="sm" />
						<Group spacing={"xs"} mt="sm" position="center">
							<LimitTotalRendering
								data={influencer?.creatorType || []}
								extractKey={(type) => type}
								limit={4}
								element={(type) => (
									<Badge key={type} color="gray" size="xs">
										{type}
									</Badge>
								)}
								trailing={(remain) => (
									<Badge
										size="xs"
										component="button"
										radius={"xl"}
										variant="light"
										fz="0.6rem"
									>
										{remain} more
									</Badge>
								)}
							/>
						</Group>
					</>
				)}
			</Box>
		</Paper>
	);
}
