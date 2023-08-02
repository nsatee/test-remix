import { Box, Center, rem, Skeleton, Stack } from "@mantine/core";
import { useStyles } from "../../routes/agent/influencer_detail";

export const InfluencerInfoSkeleton = () => {
	const { classes } = useStyles();
	return (
		<>
			<Box pos="relative">
				<Skeleton width="12rem" h="12rem" />
			</Box>
			<div className={classes.headerTextContainer}>
				<Stack spacing={"sm"}>
					<Center>
						<Skeleton h={"2rem"} w={rem(300)} />
					</Center>
					<Center>
						<Skeleton h={"1rem"} w={rem(120)} />
					</Center>
				</Stack>
			</div>
		</>
	);
};
