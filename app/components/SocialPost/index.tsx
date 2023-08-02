import { Box, Group, Stack, Text, createStyles } from "@mantine/core";
import { cloneElement } from "react";

const usePostStyle = createStyles((theme) => ({
	image: {
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.md,
		width: "100%",
	},
	content: {
		position: "absolute",
		padding: theme.spacing.sm,
		bottom: 0,
		left: 0,
		width: "100%",
	},

	contentWrapper: {
		background: theme.fn.rgba(theme.white, 0.75),
		width: "100%",
		padding: theme.spacing.sm,
		borderRadius: theme.radius.sm,
		backdropFilter: "blur(10px)",
		color: theme.black,
	},
}));

export const SocialPost = (
	props: Partial<{
		image: string;
		name: string;
		caption: string;
		stats: { icon: JSX.Element; value?: string; hidden?: boolean }[];
		compact?: boolean;
	}>
) => {
	const { classes } = usePostStyle();
	return (
		<Box pos="relative">
			<img
				src={props.image}
				crossOrigin="anonymous"
				className={classes.image}
			/>
			<Box className={classes.content}>
				<Stack className={classes.contentWrapper} spacing={"xs"}>
					<Text>
						<Text
							fw="bold"
							lineClamp={1}
							span
							size={props.compact ? "sm" : undefined}
						>
							{props.name}
						</Text>
						<Text lineClamp={2} size={props.compact ? "xs" : "sm"}>
							{props.caption}
						</Text>
					</Text>
					<Group>
						{props.stats?.map(
							(val) =>
								val &&
								!val.hidden && (
									<Group spacing={"xs"}>
										{cloneElement(val.icon, {
											size: "1rem",
										})}
										<Text size={props.compact ? "xs" : "sm"}>{val.value}</Text>
									</Group>
								)
						)}
					</Group>
				</Stack>
			</Box>
		</Box>
	);
};
