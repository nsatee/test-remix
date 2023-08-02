import { Button, Menu } from "@mantine/core";

import { useHideOnStatus } from "./useHideOnStatus";
import { useApplicationAction } from "./useApplicationAction";

export const InfluencerRowActionMenu = ({
	applicationId,
}: {
	applicationId: string;
}) => {
	const { hideOnStatus } = useHideOnStatus();
	const approve = useApplicationAction(applicationId, "Scheduling");
	const pass = useApplicationAction(applicationId, "Passed");
	return (
		<>
			{hideOnStatus(
				["Posted", "Passed", "Completed", "Confirmed", "Scheduling"],
				<Menu withArrow width={120}>
					<Menu.Target>
						<Button
							size="sm"
							variant="light"
							loading={approve.isLoading || pass.isLoading}
						>
							Set approval
						</Button>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item onClick={() => approve.mutate()}>Accept</Menu.Item>
						<Menu.Item color="red" onClick={() => pass.mutate()}>
							Pass
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			)}
		</>
	);
};
