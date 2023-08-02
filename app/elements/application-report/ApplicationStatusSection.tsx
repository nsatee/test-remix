import {
	Badge,
	Flex,
	Group,
	MantineColor,
	Paper,
	RingProgress,
	Stack,
	Text,
} from "@mantine/core";
import { sum } from "lodash";
import pluralize from "pluralize";
import { useMemo } from "react";

import { intlUnit } from "../../utils/intlNumber";
import { percent } from "../../utils/percent";
import {
	CampaignStatsSection,
	CampaignStatsSectionProps,
} from "./CampaignStatsSectionProps";

export const ApplicationStatusSection = (props: {
	total: number;
	applicationStats: { color: MantineColor; tooltip?: string; value: number }[];
	campaignStats: CampaignStatsSectionProps;
}) => {
	const percentStats = useMemo(() => {
		const total = sum(props.applicationStats.map((val) => val.value));
		return props.applicationStats.map((val) => {
			return {
				...val,
				value: percent(total, val.value),
			};
		});
	}, [props.applicationStats]);
	return (
		<>
			<Paper p="md" radius={"lg"} withBorder shadow="sm" w="100%">
				<Stack w="100%" spacing={"xl"}>
					<Flex justify={"space-around"}>
						<Stack align="center">
							<RingProgress
								size={240}
								thickness={32}
								label={
									<Flex
										direction={"column"}
										ta="center"
										align="center"
										justify={"center"}
									>
										<Text span fz="2.5rem" fw="bold">
											{intlUnit(props.total)}
										</Text>
										<Text size="xs">{`${pluralize(
											"Application",
											props.total
										)} `}</Text>
									</Flex>
								}
								sections={percentStats}
							/>

							<Group
								align="flex-start"
								position="center"
								sx={(theme) => ({
									maxWidth: theme.breakpoints.sm,
								})}
							>
								{props.applicationStats.map((info) => (
									<Badge
										variant="dot"
										color={info.color}
										key={info.tooltip}
										sx={{ textTransform: "none" }}
									>
										{info.tooltip}
									</Badge>
								))}
							</Group>
						</Stack>
					</Flex>
					<Group sx={{ justifyContent: "space-around" }}>
						<CampaignStatsSection stats={props.campaignStats} />
					</Group>
				</Stack>
			</Paper>
		</>
	);
};
