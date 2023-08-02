import { Stack } from "@mantine/core";
import { LatestCollabSkeleton } from "./LatestCollabSkeleton";
import { InfluencerDetailStatsSkeleton } from "./InfluencerDetailStatsSkeleton";
import { InfluencerSocialListSkeleton } from "./InfluencerSocialListSkeleton";
import { InfluencerInfoSkeleton } from "./InfluencerInfoSkeleton";

export const InfluencerDetailPageSkeleton = () => {
	return (
		<>
			<Stack spacing="xl" style={{ flex: 1 }}>
				<Stack align="center">
					<InfluencerInfoSkeleton />
					<InfluencerSocialListSkeleton />

					<InfluencerDetailStatsSkeleton />
				</Stack>
			</Stack>
			<LatestCollabSkeleton />
		</>
	);
};
