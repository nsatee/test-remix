import { Badge, Button, Flex, Stack } from "@mantine/core";
import { IconMail, IconPhone } from "@tabler/icons-react";

import { useHideOnStatus } from "./useHideOnStatus";
import { useSendReminder } from "./useSendReminder";

export const InfluencerRowSchedulingAction = ({
	applicationId,
	isReminded,
	email,
	phone,
}: {
	applicationId: string;
	isReminded?: boolean;
	email?: string;
	phone?: string | null;
}) => {
	const { showOnStatus } = useHideOnStatus();
	const remind = useSendReminder(applicationId);
	return (
		<>
			{showOnStatus(
				["Scheduling"],
				<Stack spacing={"4px"}>
					{isReminded ? (
						<Badge color="gray">Reminder sent</Badge>
					) : (
						<Button
							size="sm"
							compact
							variant="light"
							onClick={() => remind.mutate()}
							loading={remind.isLoading}
						>
							Send reminder
						</Button>
					)}
					<Flex gap={"xs"} wrap={"nowrap"}>
						<Button
							component="a"
							href={`mailto:${email}`}
							leftIcon={<IconMail size={"1rem"} />}
							size="xs"
							compact
							fullWidth
							variant="subtle"
						>
							Email
						</Button>
						<Button
							component="a"
							href={`tel:${phone}`}
							fullWidth
							leftIcon={<IconPhone size={"1rem"} />}
							size="xs"
							compact
							variant="subtle"
						>
							Phone
						</Button>
					</Flex>
				</Stack>
			)}
		</>
	);
};
