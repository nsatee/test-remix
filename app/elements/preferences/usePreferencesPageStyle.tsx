import { createStyles } from "@mantine/core";

export const usePreferencesPageStyle = createStyles((theme) => ({
	header: {
		background: theme.colors.gray[0],
		borderRadius: theme.radius.md,
	},
	plainBtn: {
		width: "100%",
		flex: 1,
		padding: theme.spacing.xs,
		borderRadius: theme.radius.md,
		"&:hover": {
			background: theme.colors.gray[1],
		},
	},
	socialRightIcon: {
		".mantine-Input-wrapper": {
			".mantine-TextInput-rightSection": {
				color: theme.colors.gray[3],
			},

			"input:focus + .mantine-TextInput-rightSection": {
				opacity: 1,
				color: theme.colors.blue[5],
			},
		},
	},
}));
