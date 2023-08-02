import { Center, rem, Skeleton, Stack } from "@mantine/core";
import { LatestPostSkeleton } from "./LatestPostSkeleton";

export const LatestCollabSkeleton = () => {
	return (
		<Stack style={{ flex: 1 }} mt="xl">
			<Center>
				<Skeleton h="2rem" w={rem(140)} />
			</Center>
			<Center>
				<Skeleton h="2.5rem" w={rem(240)} />
			</Center>
			<LatestPostSkeleton />
		</Stack>
	);
};
