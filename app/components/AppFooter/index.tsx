import {
	ActionIcon,
	Container,
	createStyles,
	Group,
	rem,
	Text,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import {
	IconBrandFacebook,
	IconBrandInstagram,
	IconBrandLinkedin,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { useLayoutEffect } from "react";

import { useUi } from "../../stores/Ui.store";
import { WiseLogo } from "../WiseLogo";
import { appFooterData } from "./appFooterData";
import { Link } from "react-router-dom";
import { Print } from "../Print";

const useStyles = createStyles((theme) => ({
	footer: {
		marginTop: rem(120),
		paddingTop: `calc(${theme.spacing.xl} * 2)`,
		paddingBottom: `calc(${theme.spacing.xl} * 2)`,
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[6]
				: theme.colors.gray[0],
	},

	logo: {
		maxWidth: rem(200),

		[theme.fn.smallerThan("sm")]: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
	},

	description: {
		marginTop: rem(5),

		[theme.fn.smallerThan("sm")]: {
			marginTop: theme.spacing.xs,
			textAlign: "center",
		},
	},

	inner: {
		display: "flex",
		justifyContent: "space-between",

		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},

	groups: {
		display: "flex",
		flexWrap: "wrap",

		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	wrapper: {
		width: rem(160),
	},

	link: {
		display: "block",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[6],
		fontSize: theme.fontSizes.sm,
		paddingTop: rem(3),
		paddingBottom: rem(3),

		"&:hover": {
			textDecoration: "underline",
		},
	},

	title: {
		fontSize: theme.fontSizes.lg,
		fontWeight: 700,
		marginBottom: `calc(${theme.spacing.xs} / 2)`,
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
	},

	afterFooter: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: theme.spacing.xl,
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,

		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
		},
	},

	social: {
		[theme.fn.smallerThan("sm")]: {
			marginTop: theme.spacing.xs,
		},
	},
}));

export function AppFooter() {
	const { ref, width, height } = useElementSize();
	const [, setUi] = useUi();
	const { data } = appFooterData;
	const { classes, cx } = useStyles();

	useLayoutEffect(() => {
		setUi((d) => {
			d.sizes.footer.height = height;
			d.sizes.footer.width = width;
		});
	}, [width, height]);

	const groups = data.map((group) => {
		const links = group.links.map((link, index) => (
			<Text<"a">
				key={index}
				className={classes.link}
				component="a"
				href={link.link}
				onClick={(event) => event.preventDefault()}
			>
				{link.label}
			</Text>
		));

		return (
			<div className={classes.wrapper} key={group.title}>
				<Text className={classes.title}>{group.title}</Text>
				{links}
			</div>
		);
	});

	return (
		<Print.Hidden>
			<footer className={cx(classes.footer)} ref={ref}>
				<Container className={classes.inner}>
					<div className={classes.logo}>
						<WiseLogo />
						<Text size="xs" color="dimmed" className={classes.description}>
							Connecting local influencers and brands.
						</Text>
					</div>
					<div className={classes.groups}>{groups}</div>
				</Container>
				<Container className={classes.afterFooter}>
					<Text color="dimmed" size="sm">
						© {format(new Date(), "yyyy")} WitWay All rights reserved.
					</Text>

					<Group spacing={0} className={classes.social} position="right" noWrap>
						<ActionIcon
							size="lg"
							component={Link}
							to="https://www.instagram.com/wiseassistant/"
						>
							<IconBrandInstagram size="1.05rem" stroke={1.5} />
						</ActionIcon>
						<ActionIcon
							size="lg"
							component={Link}
							to="https://www.facebook.com/wiseassistant/"
						>
							<IconBrandFacebook size="1.05rem" stroke={1.5} />
						</ActionIcon>
						<ActionIcon
							size="lg"
							component={Link}
							to="https://www.linkedin.com/company/gogetwise"
						>
							<IconBrandLinkedin size="1.05rem" stroke={1.5} />
						</ActionIcon>
					</Group>
				</Container>
			</footer>
		</Print.Hidden>
	);
}
