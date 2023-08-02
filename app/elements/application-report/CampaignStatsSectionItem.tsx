import { Stack, Text } from "@mantine/core";

export const CampaignStatsSectionItem = (props: {
	title: string;
	value: string | number;
}) => {
	return (
		<Stack
			spacing={0}
			p="sm"
			sx={(theme) => ({
				backgroundColor: theme.colors.gray[0],
				borderRadius: theme.radius.md,
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: theme.colors.gray[3],
				minWidth: 160,
			})}
		>
			<Text size="sm" ta="center" color="dimmed">
				{props.title}
			</Text>
			<Text fz="2rem" fw="bold" ta="center">
				{props.value}
			</Text>
		</Stack>
	);
};
