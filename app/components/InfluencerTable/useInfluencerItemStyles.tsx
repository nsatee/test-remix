import { createStyles } from "@mantine/core";

export const useInfluencerItemStyles = createStyles((theme) => ({
	root: {
		display: "grid",
		gap: theme.spacing.xs,
		borderBottom: `1px solid ${theme.colors.gray[3]}`,
		padding: `${theme.spacing.md} 0`,
	},
	container: {
		display: "grid",
		alignItems: "center",
		gap: theme.spacing.xs,
		gridTemplateColumns: "240px 1fr 140px",
		[theme.fn.smallerThan("md")]: {
			gridTemplateColumns: "160px 1fr 140px",
		},
		[theme.fn.smallerThan("sm")]: {
			gridTemplateColumns: "1fr",
			gap: theme.spacing.md,
		},
	},
	alignEnd: {
		justifySelf: "flex-end",
		[theme.fn.smallerThan("sm")]: {
			justifySelf: "center",
		},
	},
	centerOnSmall: {
		[theme.fn.smallerThan("sm")]: {
			justifyContent: "center",
		},
	},
	thumbnailGroup: {
		display: "grid",
		gridTemplateColumns: "56px 160px",
		gap: theme.spacing.xs,
		[theme.fn.smallerThan("md")]: {
			gridTemplateColumns: "1fr",
		},
		[theme.fn.smallerThan("sm")]: {
			justifyItems: "center",
		},
	},
	locationText: {
		[theme.fn.smallerThan("sm")]: {
			textAlign: "center",
			display: "block",
			width: "100%",
		},
	},
	approvalGroup: {
		display: "grid",
		justifyItems: "flex-end",
		gap: theme.spacing.xs,
	},
	infoGroup: {
		display: "grid",
		gridTemplateColumns: "1fr 200px",
		alignItems: "center",
		gap: theme.spacing.xs,
		[theme.fn.smallerThan("lg")]: {
			gridTemplateColumns: "1fr",
		},
		[theme.fn.smallerThan("sm")]: {
			justifyItems: "center",
		},
	},
}));
