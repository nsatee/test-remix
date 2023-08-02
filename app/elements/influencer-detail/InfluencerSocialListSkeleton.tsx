import { Group, Skeleton } from "@mantine/core";

export const InfluencerSocialListSkeleton = () => {
	return (
		<Group position="center">
			<Skeleton w={32} h={32} />
			<Skeleton w={32} h={32} />
		</Group>
	);
};
