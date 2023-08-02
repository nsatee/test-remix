import { rem, SegmentedControl, Skeleton, Stack } from "@mantine/core";
import { Suspense, useState } from "react";
import { InfluencerStats } from "./InfluencerStats";
import { CampaignStats } from "./CampaignStats";

type StatsName = "influencers" | "campaigns";
type StatsSegmentData = { label: string; value: StatsName };
const statsData: StatsSegmentData[] = [
	{ label: "Influencers", value: "influencers" },
	{ label: "Campaigns", value: "campaigns" },
];

export const DashboardStats = () => {
	const [activeStats, setActiveStats] = useState<StatsName>(statsData[0].value);
	return (
		<Stack spacing={"xs"}>
			<SegmentedControl
				value={activeStats}
				onChange={(value) => setActiveStats(value as StatsName)}
				data={statsData}
			/>
			<>
				{activeStats === "influencers" && (
					<Suspense fallback={<Skeleton h={rem(240)} />}>
						<InfluencerStats />
					</Suspense>
				)}
			</>
			<>
				{activeStats === "campaigns" && (
					<Suspense fallback={<Skeleton h={rem(240)} />}>
						<CampaignStats />
					</Suspense>
				)}
			</>
		</Stack>
	);
};
