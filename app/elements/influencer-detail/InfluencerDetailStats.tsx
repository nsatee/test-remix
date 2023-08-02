import { SimpleGrid } from "@mantine/core";
import { IconCamera, IconVideo } from "@tabler/icons-react";

import { Creator } from "../../api/services/InfluencerDetail";
import { BasicStatItem } from "../../components/BasicStatItem";
import { useStyles } from "../../routes/agent/influencer_detail";
import { parseCurrency } from "../../utils/parseCurrency";

export const InfluencerDetailStats = ({ data }: { data: Creator }) => {
	const { theme } = useStyles();
	return (
		<SimpleGrid cols={2} maw={theme.breakpoints.xs} w="100%">
			<BasicStatItem
				title="Image rate"
				value={
					data.preferredPayRateImages
						? parseCurrency(data.preferredPayRateImages)
						: "N/A"
				}
				icon={<IconCamera />}
			/>
			<BasicStatItem
				title="Video rate"
				value={
					data.preferredPayRateVideo
						? parseCurrency(data.preferredPayRateVideo)
						: "N/A"
				}
				icon={<IconVideo />}
			/>
		</SimpleGrid>
	);
};
