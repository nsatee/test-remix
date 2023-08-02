import { Flex } from "@mantine/core";
import { CampaignStatsSectionItem } from "./CampaignStatsSectionItem";

export type CampaignStatsSectionProps = {
	title: string;
	value: string | number;
}[];
export const CampaignStatsSection = (props: {
	stats: CampaignStatsSectionProps;
}) => {
	return (
		<Flex
			wrap={"wrap"}
			gap="lg"
			w="100%"
			align="center"
			justify="center"
			sx={{ alignSelf: "center" }}
		>
			{props.stats.map((info) => (
				<CampaignStatsSectionItem
					key={info.title}
					title={info.title}
					value={info.value}
				/>
			))}
		</Flex>
	);
};
