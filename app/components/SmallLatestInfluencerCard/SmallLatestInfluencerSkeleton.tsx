import { Group, Skeleton, rem, Stack } from "@mantine/core";
import { Fragment } from "react";
import { createRandomStringArray } from "../../utils/createRandomStringArray";

export const SmallLatestInfluencerSkeleton = ({
	repeat = 1,
}: {
	repeat: number;
}) => {
	return (
		<Fragment>
			{createRandomStringArray(repeat).map((key) => (
				<Group noWrap key={key} w="100%">
					<Skeleton
						w={rem(94)}
						h={rem(94)}
						radius="md"
						sx={{ flexShrink: 0 }}
					/>
					<Stack w="100%">
						<Skeleton w={"30%"} h={"0.8rem"} radius="md" />
						<Skeleton w={"50%"} h={"1rem"} radius="md" />
						<Group>
							<Skeleton
								w={rem(24)}
								h={rem(24)}
								radius="md"
								sx={{ flexShrink: 0 }}
							/>
							<Skeleton
								w={rem(24)}
								h={rem(24)}
								radius="md"
								sx={{ flexShrink: 0 }}
							/>
						</Group>
					</Stack>
				</Group>
			))}
		</Fragment>
	);
};
