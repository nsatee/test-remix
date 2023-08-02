import {
	Anchor,
	AspectRatio,
	Badge,
	Box,
	Card,
	Center,
	createStyles,
	Group,
	Image,
	Loader,
	rem,
	Stack,
	Switch,
	Text,
	ThemeIcon,
	Title,
	Tooltip,
} from "@mantine/core";
import {
	IconChalkboard,
	IconEye,
	IconEyeOff,
	IconFileDescription,
	IconPhoto,
	IconShoppingCart,
	IconTicket,
	IconTrendingUp,
} from "@tabler/icons-react";
import { map } from "lodash";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";

import { CampaignStatus } from "../../api/common.type";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	footer: {
		display: "flex",
		justifyContent: "space-between",
		padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
		margin: 0,
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},

	title: {
		lineHeight: 1,
	},
}));

interface CampaignCardProps {
	image?: string;
	title: string;
	status: CampaignStatus;
	goal: string;
	description: string | null;
	handlePublish?: (isPublished: boolean) => Promise<void>;
	isPublishing?: boolean;
	stats: {
		title: string;
		value: string;
	}[];
	id: string;
	brandId?: string;
}

const campaignGoalIcon = (goal: string) => {
	switch (goal) {
		case "Trial":
			return <IconChalkboard />;
		case "Growth":
			return <IconTrendingUp />;
		case "Product":
			return <IconShoppingCart />;
		case "Event":
			return <IconTicket />;
		case "Content":
			return <IconFileDescription />;
		default:
			null;
	}
};

export function CampaignCard({
	image,
	title,
	goal,
	status,
	stats,
	description,
	handlePublish,
	isPublishing,

	id,
}: CampaignCardProps) {
	const [checked, setChecked] = useState(status);
	const { classes } = useStyles();

	const items = map(stats, (stat) => (
		<div key={stat.title}>
			<Text size="xs" color="dimmed" lineClamp={1}>
				{stat.title}
			</Text>

			<Text weight={500} size="sm">
				{stat.value}
			</Text>
		</div>
	));

	return (
		<Card withBorder className={classes.card} radius="md" px="0" pt="0" m="0">
			<Card.Section
				sx={(theme) => ({
					overflow: "hidden",
					width: "100%",
					background: theme.colors.gray[0],
				})}
				ratio={16 / 9}
				m="0"
				component={AspectRatio}
				pos="relative"
			>
				{image ? (
					<Image src={image} w="100%" h="100%" alt={title} />
				) : (
					<Center
						h="100%"
						sx={(theme) => ({
							color: theme.colors.gray[5],
						})}
					>
						<IconPhoto size={40} />
					</Center>
				)}
			</Card.Section>
			<Box pos="absolute" top="4px" right="4px" sx={{ zIndex: 2 }}></Box>

			<Stack spacing={"xs"} p="lg">
				<Anchor component={Link} to={`/agent/campaign-application/${id}`}>
					<Title order={5} className={classes.title} lineClamp={2} lh="1.2rem">
						{title}
					</Title>
				</Anchor>

				<Text size="sm" color="dimmed" lineClamp={2}>
					{description || "N/A"}
				</Text>
			</Stack>
			<Card.Section className={classes.footer}>{items}</Card.Section>
			<Card.Section className={classes.footer} withBorder>
				<Group position="apart" w="100%">
					<Tooltip label="Campaign goal">
						<Badge
							size="sm"
							pl="0"
							variant="outline"
							leftSection={
								<ThemeIcon variant="outline" sx={{ border: 0 }}>
									<>
										{campaignGoalIcon(goal)
											? cloneElement(campaignGoalIcon(goal)!, {
													size: rem(12),
											  })
											: undefined}
									</>
								</ThemeIcon>
							}
						>
							{goal}
						</Badge>
					</Tooltip>
					<Tooltip label="Publish campaign">
						<Group>
							<Switch
								label={
									isPublishing ? (
										<Loader size="xs" />
									) : (
										<Text
											size="xs"
											color={status === "Published" ? "green" : "gray"}
											fw={status === "Published" ? "bold" : undefined}
											sx={{ cursor: "pointer" }}
										>
											{status}
										</Text>
									)
								}
								labelPosition="left"
								checked={checked === "Published"}
								color="green"
								size="sm"
								style={{ opacity: isPublishing ? 0.5 : 1 }}
								onLabel={<IconEye size={16} />}
								offLabel={<IconEyeOff size={16} />}
								onChange={async () => {
									await handlePublish?.(checked === "Published");
									setChecked((p) =>
										p === "Published" ? "In Progress" : "Published"
									);
								}}
							/>
						</Group>
					</Tooltip>
				</Group>
			</Card.Section>
		</Card>
	);
}
