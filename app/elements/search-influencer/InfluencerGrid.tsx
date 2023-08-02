import { SimpleGrid } from "@mantine/core";
import { PropsWithChildren } from "react";

export const InfluencerGrid = ({ children }: PropsWithChildren) => {
	return (
		<SimpleGrid
			cols={4}
			breakpoints={[
				{ maxWidth: "xl", cols: 3 },
				{ maxWidth: "lg", cols: 2 },
				{ maxWidth: "sm", cols: 1 },
			]}
		>
			{children}
		</SimpleGrid>
	);
};
