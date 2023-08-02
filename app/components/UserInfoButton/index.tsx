import {
	Avatar,
	createStyles,
	Group,
	Text,
	UnstyledButton,
	UnstyledButtonProps,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	user: {
		display: "block",
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[8]
					: theme.colors.gray[2],
		},
	},

	userInfo: {
		flex: 1,
		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
	},
}));

interface UserButtonProps extends UnstyledButtonProps {
	image?: string;
	name: string;
	email: string;
	icon?: React.ReactNode;
}

export function UserButton({
	image,
	name,
	email,
	icon,
	...others
}: UserButtonProps) {
	const { classes } = useStyles();

	return (
		<UnstyledButton className={classes.user} {...others}>
			<Group>
				<Avatar src={image} radius="xl" />

				<div className={classes.userInfo}>
					<Text size="sm" weight={500}>
						{name}
					</Text>

					<Text color="dimmed" size="xs">
						{email}
					</Text>
				</div>

				{icon}
			</Group>
		</UnstyledButton>
	);
}
