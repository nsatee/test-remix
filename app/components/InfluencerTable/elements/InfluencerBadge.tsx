import { Badge, BadgeProps, MantineColor } from "@mantine/core";
import { StatusEnum } from "../../../api/common.type";
import { useInfluencerItemStyles } from "../useInfluencerItemStyles";

export const statusColor: Record<StatusEnum, MantineColor> = {
	Assessing: "yellow",
	Scheduling: "blue",
	Confirmed: "green",
	Completed: "gray",
	Posted: "cyan",
	Passed: "orange",
	"No Show": "red",
	"Can't Attend": "gray",
};

export const InfluencerBadge = (props: BadgeProps & { status: StatusEnum }) => {
	const { theme } = useInfluencerItemStyles();

	return (
		<Badge
			size="xs"
			color={statusColor[props.status]}
			variant="dot"
			style={{
				borderColor: theme.colors[statusColor[props.status]]?.[5],
			}}
			{...props}
		/>
	);
};
