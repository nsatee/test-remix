import { RingProgress, Text } from "@mantine/core";

export const InfluencerScoreChart = () => {
	return (
		<RingProgress
			size={68}
			thickness={6}
			roundCaps
			sections={[{ value: 80, color: "green" }]}
			label={
				<Text color="green" weight={700} align="center" size="xs">
					80%
				</Text>
			}
		/>
	);
};
