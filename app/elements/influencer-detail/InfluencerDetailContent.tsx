import { Badge, Group, Stack } from "@mantine/core";
import { IconAward, IconDiscountCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { http_getInfluencerById } from "../../api/services/InfluencerDetail";
import { Membership } from "../../api/services/SearchInfluencer";
import { HideOnEmpty } from "../../components/HideOnEmpty";
import { InfluencerBadge } from "../../components/InfluencerBadge";
import { useStyles } from "../../routes/agent/influencer_detail";
import { InfluencerDetailStats } from "./InfluencerDetailStats";
import { InfluencerInfo } from "./InfluencerInfo";
import { InfluencerSocialList } from "./InfluencerSocialList";
import { LatestCollabSection } from "./LatestCollabSection";
import { LatestCollabSkeleton } from "./LatestCollabSkeleton";

export const InfluencerDetailContent = () => {
	const { theme } = useStyles();
	const { uid } = useParams();
	const { data } = useQuery(
		["http_getInfluencerById", uid],
		async () => {
			if (!uid) return null;
			const res = await http_getInfluencerById({ id: uid });
			return res || null;
		},
		{
			enabled: Boolean(uid),
		}
	);

	if (!data) return null;
	return (
		<>
			<Stack spacing="xl" style={{ flex: 1 }}>
				<Stack align="center">
					<InfluencerInfo data={data} />
					<InfluencerSocialList data={data} />
					<HideOnEmpty component={Group} position="center">
						{data.top && (
							<InfluencerBadge icon={<IconAward />} size="md">
								Top influencer
							</InfluencerBadge>
						)}
						{data.membership === Membership.VerifiedMember && (
							<InfluencerBadge
								icon={<IconDiscountCheck />}
								color="green"
								size="md"
							>
								Verified
							</InfluencerBadge>
						)}
					</HideOnEmpty>
					<HideOnEmpty
						component={Group}
						position="center"
						spacing="xs"
						maw={theme.breakpoints.xs}
					>
						{data.creatorType?.map((badge) => (
							<Badge key={badge}>{badge}</Badge>
						))}
					</HideOnEmpty>
					<InfluencerDetailStats data={data} />
				</Stack>

				{/* <InstagramProfile url={data.instagramHandle} />
				<TikTokProfile url={data.tikTokHandle} /> */}
			</Stack>
			<Suspense fallback={<LatestCollabSkeleton />}>
				<LatestCollabSection creatorName={data.name} />
			</Suspense>
		</>
	);
};
