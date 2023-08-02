import {
	Anchor,
	AnchorProps,
	createPolymorphicComponent,
	createStyles,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { forwardRef } from "react";

const useStyles = createStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		gap: theme.spacing.xs,
	},
}));

export type SingleBreadcrumbProps = AnchorProps & {
	hideArrowIcon?: boolean;
};

const _SingleBreadcrumb = forwardRef<HTMLAnchorElement, SingleBreadcrumbProps>(
	({ hideArrowIcon, children, ...props }, ref) => {
		const { classes, cx } = useStyles();
		return (
			<Anchor
				{...props}
				className={cx(classes.root, props.className)}
				ref={ref}
			>
				{!hideArrowIcon && <IconArrowLeft size="1rem" />}
				<span>{children}</span>
			</Anchor>
		);
	}
);

export const SingleBreadcrumb = createPolymorphicComponent<
	"a",
	SingleBreadcrumbProps
>(_SingleBreadcrumb);
