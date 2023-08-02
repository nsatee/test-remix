import {
	createStyles,
	Group,
	Paper,
	rem,
	Text,
	ThemeIcon,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	root: {
		padding: `calc(${theme.spacing.xl} * 1.5)`,
	},

	value: {
		fontSize: rem(24),
		fontWeight: 700,
		lineHeight: 1,
	},

	icon: {
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[3]
				: theme.colors.gray[4],
	},

	title: {
		fontWeight: 700,
		textTransform: "uppercase",
	},
}));

interface BasicStatItemProps {
	title: string;
	icon?: JSX.Element | null;
	description?: string;
	value: string;
}

export function BasicStatItem(stat: BasicStatItemProps) {
	const { classes } = useStyles();
	return (
		<Paper withBorder p="md" radius="md" key={stat.title}>
			<Group position="apart">
				<Text size="xs" color="dimmed" className={classes.title}>
					{stat.title}
				</Text>

				<ThemeIcon
					className={classes.icon}
					variant="default"
					sx={{ border: 0 }}
				>
					{stat.icon}
				</ThemeIcon>
			</Group>

			<Group align="flex-end" spacing="xs" mt={25}>
				<Text className={classes.value}>{stat.value}</Text>
			</Group>

			{stat.description && (
				<Text fz="xs" c="dimmed" mt={7}>
					{stat.description}
				</Text>
			)}
		</Paper>
	);
}
