import {
	Avatar,
	createPolymorphicComponent,
	createStyles,
	Group,
	rem,
	Text,
	UnstyledButton,
	UnstyledButtonProps,
} from "@mantine/core";
import { compact, isEmpty } from "lodash";
import { forwardRef, Fragment } from "react";

const useStyles = createStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		gap: theme.spacing.md,
		padding: `${theme.spacing.sm} ${theme.spacing.md}`,
		transition: "100ms",
		// borderRadius: theme.radius.md,
		":hover": {
			background: theme.colors.gray[1],
		},
	},
}));

export type UserListItemProps = UnstyledButtonProps & {
	badges?: (JSX.Element | null | undefined)[];
	title: string;
	description?: string;
	thumbnail?: string;
};

const _UserListItem = forwardRef<HTMLButtonElement, UserListItemProps>(
	({ thumbnail, title, description, badges, children, ...props }, ref) => {
		const { classes, cx } = useStyles();
		const badgeValues = compact(badges);
		return (
			<>
				<UnstyledButton
					{...props}
					className={cx(classes.root, props.className)}
					ref={ref}
				>
					<Avatar size="lg" radius={999} src={thumbnail} />

					<div>
						{!isEmpty(badgeValues) && (
							<Group spacing={"xs"} mb={rem(3)}>
								{badgeValues.map((elm, key) => (
									<Fragment key={key}>{elm}</Fragment>
								))}
							</Group>
						)}
						<Text fw="600">{title}</Text>
						{description && (
							<Text color="dimmed" size="sm">
								{description}
							</Text>
						)}
					</div>
				</UnstyledButton>
			</>
		);
	}
);

export const UserListItem = createPolymorphicComponent<
	"button",
	UserListItemProps
>(_UserListItem);
