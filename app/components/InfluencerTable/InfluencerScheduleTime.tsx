import { Text } from "@mantine/core";

import { useInfluencerRowProps } from "./influencerRowStore";
import { useHideOnStatus } from "./useHideOnStatus";

export const InfluencerScheduleTime = () => {
	const [props] = useInfluencerRowProps();
	const { showOnStatus } = useHideOnStatus();

	return (
		<>
			{showOnStatus(
				["Completed", "Posted", "Confirmed"],
				!props.scheduled ? (
					<Text size="sm" color="dimmed">
						Not provided
					</Text>
				) : (
					<Text size="sm">
						<Text span color="dimmed">
							Scheduled:{" "}
						</Text>
						<Text span>{props.scheduled}</Text>
					</Text>
				)
			)}
		</>
	);
};
