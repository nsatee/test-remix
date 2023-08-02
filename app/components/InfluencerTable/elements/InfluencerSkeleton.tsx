import { Skeleton, Group, Stack } from "@mantine/core";

import { useInfluencerItemStyles } from "../useInfluencerItemStyles";

export const InfluencerSkeleton = () => {
	const { classes, cx } = useInfluencerItemStyles();
	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<div className={classes.thumbnailGroup}>
					<div>
						<Skeleton w={60} h={60} radius={999} />
					</div>
					<div>
						<Group>
							<Stack align="flex-start" spacing={"sm"}>
								<Skeleton w={"120px"} h={"1rem"} />
								<Skeleton w={"120px"} h={"0.6rem"} />
							</Stack>
						</Group>
					</div>
				</div>
				<div className={classes.infoGroup}>
					<Skeleton w={"60%"} h={"1rem"} />
				</div>
				<div className={cx(classes.alignEnd, classes.approvalGroup)}>
					<Skeleton w={120} h={"2.4rem"} />
				</div>
			</div>
		</div>
	);
};
