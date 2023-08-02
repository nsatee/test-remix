import { AspectRatio, Box, Skeleton } from "@mantine/core";
import { useStyles } from "../../routes/agent/influencer_detail";
import { createRandomStringArray } from "../../utils/createRandomStringArray";

export const LatestPostSkeleton = () => {
	const { classes } = useStyles();
	return (
		<div className={classes.instagramContainer}>
			{createRandomStringArray(2).map((id) => (
				<Box p="xs" key={id}>
					<AspectRatio w="100%" ratio={9 / 16}>
						<Skeleton w="100%" h="100%" />
					</AspectRatio>
				</Box>
			))}
		</div>
	);
};
