import { Badge, Group, Popover } from "@mantine/core";
import { LimitTotalRendering } from "../LimitTotalRendering";
import { useHideOnStatus } from "./useHideOnStatus";
import { useInfluencerItemStyles } from "./useInfluencerItemStyles";
import { useInfluencerRowProps } from "./influencerRowStore";

export const InfluencerRowMarketType = () => {
	const [props] = useInfluencerRowProps();
	const { classes } = useInfluencerItemStyles();
	const { hideOnStatus } = useHideOnStatus();
	return (
		<>
			{hideOnStatus(
				["Posted", "Passed", "Completed", "Confirmed"],
				<Group spacing={"8px"} className={classes.centerOnSmall}>
					<LimitTotalRendering
						limit={6}
						data={props.types || []}
						extractKey={(data) => data}
						element={(type) => (
							<Badge
								color="gray"
								size="xs"
								sx={(theme) => ({
									borderWidth: "1px",
									borderColor: theme.colors.gray[3],
								})}
							>
								{type}
							</Badge>
						)}
						trailing={(remain) => (
							<Popover width={300} withArrow arrowSize={12} shadow="md">
								<Popover.Target>
									<Badge
										role="button"
										component="button"
										size="sm"
										sx={{ cursor: "pointer", textTransform: "capitalize" }}
									>
										{remain} More
									</Badge>
								</Popover.Target>
								<Popover.Dropdown>
									<Group spacing={"xs"}>
										{props.types?.map((type) => (
											<Badge
												color="gray"
												size="xs"
												sx={(theme) => ({
													borderWidth: "1px",
													borderColor: theme.colors.gray[3],
													color: theme.black,
												})}
											>
												{type}
											</Badge>
										))}
									</Group>
								</Popover.Dropdown>
							</Popover>
						)}
					/>
				</Group>
			)}
		</>
	);
};
