import {
	Box,
	createStyles,
	Divider,
	Group,
	Paper,
	rem,
	Text,
	Title,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	root: {
		borderRadius: theme.radius.md,
	},

	statsWrapper: {
		display: "flex",
		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
			textAlign: "center",
		},
	},

	title: {
		textTransform: "uppercase",
		fontWeight: 700,
		fontSize: theme.fontSizes.sm,
	},

	count: {
		fontSize: rem(32),
		lineHeight: 1,
		fontWeight: 700,
		marginBottom: theme.spacing.md,
	},

	description: {
		fontSize: theme.fontSizes.sm,
		marginTop: rem(5),
		opacity: 0.5,
	},

	stat: {
		flex: 1,

		"& + &": {
			paddingLeft: theme.spacing.xl,
			marginLeft: theme.spacing.xl,
			borderLeft: `${rem(1)} solid ${theme.colors.gray[4]}`,

			[theme.fn.smallerThan("sm")]: {
				paddingLeft: 0,
				marginLeft: 0,
				borderLeft: 0,
				paddingTop: theme.spacing.xl,
				marginTop: theme.spacing.xl,
				borderTop: `${rem(1)} solid ${theme.colors.gray[4]}`,
			},
		},
	},

	titleSection: {
		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
			textAlign: "center",
		},
	},
}));

interface StatsGroupProps {
	mainValue: string;
	description: string;
	trailingElement?: React.ReactNode;
	data: { title: string; stats: string; description?: string; unit?: string }[];
}

export function StatsGroup({
	mainValue,
	description,
	trailingElement,
	data,
}: StatsGroupProps) {
	const { classes } = useStyles();
	const stats = data.map((stat) => (
		<div key={stat.title} className={classes.stat}>
			<Text className={classes.count}>
				{stat.stats}
				{stat.unit && <span>{stat.unit}</span>}
			</Text>
			<Text className={classes.title}>{stat.title}</Text>
			{stat.description && (
				<Text className={classes.description}>{stat.description}</Text>
			)}
		</div>
	));
	return (
		<Paper className={classes.root} p="md" withBorder shadow="sm">
			<Group position="apart" className={classes.titleSection}>
				<Box>
					<Title>{mainValue}</Title>
					<Text color="dimmed">{description}</Text>
				</Box>
				<>{trailingElement}</>
			</Group>
			<Divider my="md" />
			<Paper className={classes.statsWrapper}>{stats}</Paper>
		</Paper>
	);
}
