import { createStyles, getStylesRef, rem } from "@mantine/core";

export const useAppSideNavStyles = createStyles((theme) => ({
	header: {
		paddingBottom: theme.spacing.md,
		marginBottom: `calc(${theme.spacing.md} * 1.5)`,
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,
	},

	footer: {
		paddingTop: theme.spacing.md,

		borderTop: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,
	},

	link: {
		...theme.fn.focusStyles(),
		display: "inline-flex",
		alignItems: "center",
		textDecoration: "none",
		fontSize: theme.fontSizes.sm,
		width: "100%",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[7],
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		borderRadius: theme.radius.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,

			[`& .${getStylesRef("icon")}`]: {
				color: theme.colorScheme === "dark" ? theme.white : theme.black,
			},
		},
	},

	dropdownLink: {
		fontWeight: 500,
		display: "block",
		textDecoration: "none",
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		paddingLeft: theme.spacing.xl,
		marginLeft: theme.spacing.xl,
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		borderLeft: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		cursor: "pointer",
		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[7]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},

	linkIcon: {
		ref: getStylesRef("icon"),
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[2]
				: theme.colors.gray[6],
		marginRight: theme.spacing.sm,
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
				.color,
			[`& .${getStylesRef("icon")}`]: {
				color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
					.color,
			},
		},
	},
}));
