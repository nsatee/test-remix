import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { StatsGroup } from "../../components/StatsGroup";
import { useQuery } from "@tanstack/react-query";
import { http_getBrandCampaignStats } from "../../api/services/Dashboard";
import { useMe } from "../../stores/Me.store";
import { compact, map, sum } from "lodash";
import { intlUnit } from "../../utils/intlNumber";
import { Link } from "react-router-dom";

export const CampaignStats = () => {
	const [me] = useMe();
	const { data } = useQuery(["campaign-stats"], async () => {
		const res = await http_getBrandCampaignStats({
			email: me?.user.email_address,
		});
		return res;
	});

	const activeCampaignTotal = compact(
		map(data?.campaignStats, (val) => val.status === "Published")
	).length;

	return (
		<StatsGroup
			mainValue={data?.campaignStats?.length.toString() || "0"}
			description="Total campaign"
			trailingElement={
				<Button
					size="sm"
					variant="outline"
					rightIcon={<IconArrowRight />}
					component={Link}
					to={`/agent/campaign-list`}
				>
					See all campaigns
				</Button>
			}
			data={[
				{
					title: "Video Plays",
					stats: intlUnit(
						sum(compact(data?.brandStats.map((t) => +t.totalImpression)))
					),
				},
				{
					title: "Avg. Engagement",
					stats: (
						sum(compact(data?.brandStats?.map((t) => +t.averageEngagement))) /
						(data?.brandStats?.length || 0)
					).toFixed(2),
					unit: "%",
				},
				{
					title: "Active",
					stats: activeCampaignTotal.toString(),
				},
			]}
		/>
	);
};
