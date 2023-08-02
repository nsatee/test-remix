import {
	Box,
	createStyles,
	Group,
	Paper,
	Progress,
	rem,
	SimpleGrid,
	Text,
	Title,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	progressLabel: {
		lineHeight: 1,
		fontSize: theme.fontSizes.sm,

		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
	},

	stat: {
		borderBottom: `${rem(4)} solid`,
		paddingBottom: rem(5),
	},

	statCount: {
		lineHeight: 1.3,
	},

	diff: {
		display: "flex",
		alignItems: "center",
	},
}));

interface StatsSegmentsProps {
	total?: string;
	totalDescription?: string;
	trailingElement?: React.ReactNode;
	data: {
		label: string;
		count: string;
		part: number;
		color: string;
	}[];
}

export function StatsSegments({
	total,
	data,
	totalDescription,
	trailingElement,
}: StatsSegmentsProps) {
	const { classes } = useStyles();

	const segments = data.map((segment) => ({
		value: segment.part,
		color: segment.color,
		label: segment.part > 10 ? `${segment.part}%` : undefined,
	}));

	const descriptions = data.map((stat) => (
		<Box
			key={stat.label}
			sx={{ borderBottomColor: stat.color }}
			className={classes.stat}
		>
			<Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
				{stat.label}
			</Text>

			<Group position="apart" spacing={0}>
				<Text fw={700}>{stat.count}</Text>
				<Text c={stat.color} fw={700} size="sm" className={classes.statCount}>
					{stat.part}%
				</Text>
			</Group>
		</Box>
	));

	return (
		<Paper p="md" radius="md" withBorder shadow="sm">
			<Group position="apart">
				<Box>
					<Title>{total}</Title>
					<Text c="dimmed">{totalDescription}</Text>
				</Box>
				<>{trailingElement}</>
			</Group>

			<Progress
				sections={segments}
				size={34}
				classNames={{ label: classes.progressLabel }}
				mt={40}
			/>
			<SimpleGrid cols={4} breakpoints={[{ maxWidth: "md", cols: 1 }]} mt="xl">
				{descriptions}
			</SimpleGrid>
		</Paper>
	);
}
