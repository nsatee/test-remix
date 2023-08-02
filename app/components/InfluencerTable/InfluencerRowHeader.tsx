import { Group, MediaQuery } from "@mantine/core";
import { InfluencerBadge } from "./elements/InfluencerBadge";
import { useHideOnStatus } from "./useHideOnStatus";
import { InfluencerCampaignNavigation } from "./elements/InfluencerCampaignNavigation";
import { useInfluencerRowProps } from "./influencerRowStore";

export const InfluencerRowHeader = () => {
	const [props] = useInfluencerRowProps();
	const { hideOnStatus } = useHideOnStatus();
	return (
		<>
			{hideOnStatus(
				["Passed"],
				<MediaQuery
					smallerThan={"sm"}
					styles={{
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: 4,
					}}
				>
					<Group spacing={"xs"} position="apart">
						<InfluencerBadge status={props.status}>
							{props.status}
						</InfluencerBadge>
						<InfluencerCampaignNavigation />
					</Group>
				</MediaQuery>
			)}
		</>
	);
};
