import {
	Avatar,
	Badge,
	BadgeProps,
	createPolymorphicComponent,
	createStyles,
} from "@mantine/core";
import { cloneElement, forwardRef } from "react";

const useStyles = createStyles((theme) => ({
	root: {
		boxShadow: theme.shadows.md,
	},
	outline: {
		background: theme.white,
	},
}));

export type InfluencerBadgeProps = BadgeProps & {
	icon?: JSX.Element;
};

const _InfluencerBadge = forwardRef<HTMLDivElement, InfluencerBadgeProps>(
	({ size = "lg", icon, children, ...props }, ref) => {
		const { classes, cx } = useStyles();
		return (
			<>
				<Badge
					tt={"capitalize"}
					leftSection={
						<Avatar
							size={size === "md" ? 18 : 24}
							radius="xl"
							color={props.color || "blue"}
						>
							<>{icon && cloneElement(icon, { size: 14 })}</>
						</Avatar>
					}
					pl={0}
					variant="filled"
					{...props}
					color={props.color}
					className={cx(
						props.variant !== "outline" && classes.root,
						props.variant === "outline" && classes.outline,
						props.className
					)}
					ref={ref}
				>
					{children}
				</Badge>
			</>
		);
	}
);

export const InfluencerBadge = createPolymorphicComponent<
	"a",
	InfluencerBadgeProps
>(_InfluencerBadge);
