import { Card, createStyles, Group, rem, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	item: {
		"& + &": {
			paddingTop: theme.spacing.sm,
			marginTop: theme.spacing.sm,
			borderTop: `${rem(1)} solid ${
				theme.colorScheme === "dark"
					? theme.colors.dark[4]
					: theme.colors.gray[2]
			}`,
		},
	},

	switch: {
		"& *": {
			cursor: "pointer",
		},
	},

	title: {
		lineHeight: 1,
	},
}));

interface SectionCardWithActionProps {
	title?: string;
	description?: string;
	data: {
		title: string;
		description?: string;
		trailingElement?: JSX.Element;
	}[];
}

export function SectionCardWithAction({
	title,
	description,
	data,
}: SectionCardWithActionProps) {
	const { classes } = useStyles();

	const items = data.map((item) => (
		<Group position="apart" className={classes.item} noWrap spacing="xl">
			<div>
				<Text>{item.title}</Text>
				<Text size="xs" color="dimmed">
					{item.description}
				</Text>
			</div>
			<>{item.trailingElement}</>
		</Group>
	));

	return (
		<Card withBorder radius="md" p="xl" className={classes.card}>
			{title && (
				<Text fz="lg" className={classes.title} fw={500}>
					{title}
				</Text>
			)}
			{description && (
				<Text fz="xs" c="dimmed" mt={3} mb="xl">
					{description}
				</Text>
			)}
			{items}
		</Card>
	);
}
