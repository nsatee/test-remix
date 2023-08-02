import { createStyles, rem } from "@mantine/core";

export const useContainInputStyles = createStyles((theme) => ({
	root: {
		position: "relative",
	},

	input: {
		height: rem(54),
		paddingTop: rem(18),
	},

	label: {
		position: "absolute",
		pointerEvents: "none",
		fontSize: theme.fontSizes.xs,
		paddingLeft: theme.spacing.md,
		paddingTop: `calc(${theme.spacing.sm} / 2)`,
		zIndex: 1,
	},
}));
