import { InfluencerBadge } from "./elements/InfluencerBadge";
import { useHideOnStatus } from "./useHideOnStatus";
import { useInfluencerRowProps } from "./influencerRowStore";

export const InfluencerRowPassBadge = () => {
	const [props] = useInfluencerRowProps();

	const { showOnStatus } = useHideOnStatus();
	return (
		<>
			{showOnStatus(
				["Passed"],
				<InfluencerBadge status={props.status}>{props.status}</InfluencerBadge>
			)}
		</>
	);
};
