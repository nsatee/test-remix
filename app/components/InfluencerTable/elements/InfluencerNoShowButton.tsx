import { Button, Paper } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useBoolean } from "../../../utils/hooks/useBoolean";

export const InfluencerNoShowButton = (props: { name: string }) => {
	const [noShow, setNoShow] = useBoolean(false, {
		on: () => {
			notifications.show({
				title: "No show setting",
				message: `${props.name}'s no show status is on`,
				color: "red",
			});
		},
		off: () => {
			notifications.show({
				title: "No show setting",
				message: `${props.name}'s no show status is off`,
				color: "gray",
			});
		},
	});
	return (
		<Button
			size="sm"
			variant="outline"
			color={noShow ? "red" : "gray"}
			onClick={setNoShow.toggle}
			leftIcon={
				<Paper w="8px" h="8px" bg={noShow ? "red" : "gray"} radius={"xl"} />
			}
		>
			No show
		</Button>
	);
};
