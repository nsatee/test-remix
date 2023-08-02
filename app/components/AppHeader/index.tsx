import {
	Burger,
	Button,
	Container,
	createStyles,
	Group,
	Header,
	rem,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";
import { isEmpty } from "lodash";
import { useLayoutEffect } from "react";

import { http_signout } from "../../api/services/User";
import { useMe } from "../../stores/Me.store";
import { useSideNavigationActiveOnMobile } from "../../stores/Navigation.store";
import { useUi } from "../../stores/Ui.store";
import { UserButton } from "../UserInfoButton";
import { WiseLogo } from "../WiseLogo";
import { Link } from "react-router-dom";
import { Print } from "../Print";

export const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
	inner: {
		height: HEADER_HEIGHT,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	links: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkLabel: {
		marginRight: rem(5),
	},
}));

interface AppHeaderProps {}

const UserMenu = () => {
	const [me] = useMe();
	if (me?.profile.username) {
		return (
			<UserButton
				py="xs"
				px="md"
				image={me.profile.profile_picture}
				email={me.user.email_address}
				name={[me.profile.first_name, me.profile.last_name].join(" ")}
			/>
		);
	}

	return (
		<Group spacing={"md"}>
			<Button variant="default">Sign in</Button>
			<Button>Join now</Button>
		</Group>
	);
};

export function AppHeader({}: AppHeaderProps) {
	const { classes } = useStyles();
	const { ref, width, height } = useElementSize();
	const [, setUi] = useUi();
	const [me] = useMe();
	const [mobileOpened, setMobileOpen] = useSideNavigationActiveOnMobile();

	useLayoutEffect(() => {
		setUi((d) => {
			d.sizes.header.width = width;
			d.sizes.header.height = height;
		});
	}, [width, height]);

	return (
		<Print.Hidden>
			<Header height={HEADER_HEIGHT} mb={120} ref={ref}>
				<Container className={classes.inner} fluid>
					<Group>
						{me?.profile.username && (
							<Burger
								opened={mobileOpened}
								onClick={() => setMobileOpen((prev) => !prev)}
								className={classes.burger}
								size="sm"
							/>
						)}
						{me?.group?.whitelabelEnable && me?.group?.logo?.[0] ? (
							<img
								src={me?.group?.logo?.[0].url}
								style={{
									height: `calc(${HEADER_HEIGHT} - 16px)`,
									width: "auto",
								}}
							/>
						) : (
							<WiseLogo />
						)}
					</Group>
					{me ? (
						me.user ? (
							!me?.hasProfile || isEmpty(me.myAirtable) ? (
								<Button
									variant="subtle"
									color="red"
									rightIcon={<IconLogout />}
									onClick={http_signout}
								>
									Sign out
								</Button>
							) : (
								<UserMenu />
							)
						) : (
							<Group spacing={"xs"}>
								<Button variant="subtle" component={Link} to="/sign-in">
									Sign in
								</Button>
								<Button component={Link} to="/register">
									Join now
								</Button>
							</Group>
						)
					) : null}
				</Container>
			</Header>
		</Print.Hidden>
	);
}
