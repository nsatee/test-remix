import { Anchor, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { useInfluencerRowProps } from "./influencerRowStore";
import { useInfluencerItemStyles } from "./useInfluencerItemStyles";
import { DynamicAvatar } from "../DynamicAvatar";

export const InfluencerRowInfoGroup = () => {
	const [props] = useInfluencerRowProps();
	const { classes } = useInfluencerItemStyles();

	return (
		<div className={classes.thumbnailGroup}>
			<div>
				<DynamicAvatar
					src={props.thumbnail}
					radius={999}
					blurUrl={props.blurThumbnail}
					size="xl"
					name={props.name}
				/>
				{/* <Avatar src={props.thumbnail} radius={999} size="lg" color="blue">
					{getInitialName(props.name)}
				</Avatar> */}
			</div>
			<div>
				<Group>
					<Stack align="flex-start" spacing={"0"}>
						<Anchor
							fw="500"
							className={classes.locationText}
							component={Link}
							to={`/agent/influencer/${props.influencerId}`}
							lineClamp={2}
						>
							{props.name}
						</Anchor>
						<Text color="dimmed" size="xs" className={classes.locationText}>
							{props.location}
						</Text>
					</Stack>
				</Group>
			</div>
		</div>
	);
};
