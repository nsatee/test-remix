import { Button } from "@mantine/core";
import { useHideOnStatus } from "./useHideOnStatus";
import { useApplicationAction } from "./useApplicationAction";

export const InfluencerRowPassButton = ({
	applicationId,
}: {
	applicationId: string;
}) => {
	const { showOnStatus } = useHideOnStatus();
	const pass = useApplicationAction(applicationId, "Passed");
	return (
		<>
			{showOnStatus(
				["Confirmed", "Scheduling"],
				<Button
					size="sm"
					variant="light"
					color="red"
					onClick={() => pass.mutate()}
					loading={pass.isLoading}
				>
					Pass
				</Button>
			)}
		</>
	);
};
