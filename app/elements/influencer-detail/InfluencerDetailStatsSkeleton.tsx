import { rem, SimpleGrid, Skeleton } from "@mantine/core";
import { useStyles } from "../../routes/agent/influencer_detail";

export const InfluencerDetailStatsSkeleton = () => {
	const { theme } = useStyles();
	return (
		<SimpleGrid cols={2} maw={theme.breakpoints.xs} w="100%">
			<Skeleton h={rem(120)} w={280} />
			<Skeleton h={rem(120)} w={280} />
		</SimpleGrid>
	);
};
