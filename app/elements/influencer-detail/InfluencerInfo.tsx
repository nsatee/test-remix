import { Box, rem, Text, Title } from "@mantine/core";
import { nth } from "lodash";
import { Creator } from "../../api/services/InfluencerDetail";

import { fullname } from "../../utils/fullname";
import { StackAvatarItem } from "./StackAvatarItem";
import { useStyles } from "../../routes/agent/influencer_detail";

export const InfluencerInfo = ({ data }: { data: Creator }) => {
	const { classes, theme } = useStyles();
	return (
		<>
			<Box pos="relative">
				<StackAvatarItem
					isMainImage
					pos="relative"
					src={nth(data.headshot, 0)?.thumbnails?.large?.url}
					size={"12rem"}
					radius={"lg"}
					sx={{ boxShadow: theme.shadows.sm, zIndex: 2 }}
				/>
				<StackAvatarItem
					src={nth(data.headshot, 1)?.thumbnails?.large?.url}
					sx={{
						boxShadow: theme.shadows.sm,
						transform: "scale(0.9)",
						zIndex: 1,
					}}
					mt={rem(16)}
				/>
				<StackAvatarItem
					src={nth(data.headshot, 2)?.thumbnails?.large?.url}
					sx={{ boxShadow: theme.shadows.sm, transform: "scale(0.8)" }}
					mt={rem(32)}
				/>
			</Box>
			<div className={classes.headerTextContainer}>
				<Title
					sx={{
						[theme.fn.smallerThan("lg")]: {
							fontSize: "1.5rem",
						},
					}}
				>
					{fullname(data.firstName, data.lastName, data.name)}
				</Title>
				<Text color="dimmed">{data.market}</Text>
			</div>
		</>
	);
};
