import {
	Divider,
	Navbar,
	Overlay,
	ScrollArea,
	UnstyledButton,
} from "@mantine/core";
import {
	IconDashboard,
	IconHome,
	IconHomePlus,
	IconPencilPlus,
	IconSend,
	IconSettings,
	IconUsers,
	IconUserSearch,
	IconUsersGroup,
} from "@tabler/icons-react";
import { isEmpty } from "lodash";
import { cloneElement, forwardRef, Fragment, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { CreateCampaignTrigger } from "../../elements/campaign-mutation/CreateCampaignTrigger";
import { useMe } from "../../stores/Me.store";
import { useSideNavigationActiveOnMobile } from "../../stores/Navigation.store";
import { CollapsibleNavItem } from "./CollapsibleNavItem";
import { useAppSideNavStyles } from "./useAppSideNavStyles";

export const SIDE_NAVIGATION_WIDTH = 260;

const data = [
	{ link: "/agent/dashboard", label: "Dashboard", icon: IconDashboard },
	{ link: "/agent/campaign-list", label: "Campaigns", icon: IconSend },
	{ link: "/agent/brand-list", label: "Brands", icon: IconHome },
	{ link: "/agent/all-influencers", label: "Influencers", icon: IconUsers },
	{ link: "/agent/marketplace", label: "Search", icon: IconUserSearch },
];

const NavigationItem = forwardRef(
	(
		{
			children,
			icon,
			to,
			onClick,
		}: PropsWithChildren<{
			icon: JSX.Element;
			to?: string;
			onClick?: () => void;
		}>,
		ref: any
	) => {
		const [, setMobileOpen] = useSideNavigationActiveOnMobile();
		const { classes } = useAppSideNavStyles();
		return to ? (
			<UnstyledButton
				component={Link}
				className={classes.link}
				to={to || "/"}
				onClick={() => setMobileOpen(false)}
				ref={ref}
			>
				<Fragment>
					{cloneElement(icon, {
						className: classes.linkIcon,
						stroke: 1.5,
					})}
				</Fragment>
				<span>{children}</span>
			</UnstyledButton>
		) : (
			<UnstyledButton
				className={classes.link}
				onClick={() => {
					onClick?.();
					setMobileOpen(false);
				}}
				ref={ref}
			>
				<Fragment>
					{cloneElement(icon, {
						className: classes.linkIcon,
						stroke: 1.5,
					})}
				</Fragment>
				<span>{children}</span>
			</UnstyledButton>
		);
	}
);

export function AppSideNavigation() {
	const [me] = useMe();
	const { classes } = useAppSideNavStyles();
	const [mobileOpened, setMobileOpen] = useSideNavigationActiveOnMobile();

	const links = data.map((item) => (
		<UnstyledButton
			component={Link}
			className={classes.link}
			to={item.link}
			key={item.label}
			onClick={() => setMobileOpen(false)}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</UnstyledButton>
	));

	return (
		<>
			<Overlay
				blur={5}
				sx={() => ({
					zIndex: 50,
					position: "fixed",
					inset: 0,
					cursor: "pointer",
					backdropFilter: "blur(5%)",
					transition: "200ms",
				})}
				style={{
					pointerEvents: mobileOpened ? "auto" : "none",
					opacity: mobileOpened ? undefined : 0,
				}}
				onClick={() => setMobileOpen(false)}
				role="button"
				aria-hidden="true"
			/>

			<Navbar
				width={{ base: SIDE_NAVIGATION_WIDTH }}
				style={{
					left: !mobileOpened ? SIDE_NAVIGATION_WIDTH * -1 : 0,
				}}
				sx={(theme) => ({
					transition: "200ms",
					[theme.fn.largerThan("sm")]: {
						left: "0 !important",
					},
				})}
			>
				<Navbar.Section grow component={ScrollArea} p="lg">
					{!isEmpty(me?.myAirtable) && (
						<>
							{links}
							<CollapsibleNavItem
								items={[
									{ label: "Public profile", link: "/agent/settings/profile" },
									{
										label: "Account management",
										link: "/agent/settings/account",
									},
									{ label: "Preferences", link: "/agent/settings/preferences" },
								]}
								label="Settings"
								icon={<IconSettings />}
							/>
							<Divider my="md" />
							{me?.myBrandAirtable?.type?.includes("Group") && !me.group ? (
								<NavigationItem
									icon={<IconUsersGroup />}
									to={"/agent/create-group"}
								>
									Create a group
								</NavigationItem>
							) : (
								<>
									<NavigationItem
										icon={<IconHomePlus />}
										to={`/agent/create-brand/${me?.group?.id || ""}`}
									>
										Create a brand
									</NavigationItem>
									<CreateCampaignButton />
								</>
							)}
						</>
					)}
				</Navbar.Section>

				{/* <Navbar.Section className={classes.footer} px="lg" py="md">
					<a
						href="#"
						className={classes.link}
						onClick={(event) => event.preventDefault()}
					>
						<IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
						<span>Change brand</span>
					</a>
				</Navbar.Section> */}
			</Navbar>
		</>
	);
}

export const CreateCampaignButton = () => {
	return (
		<CreateCampaignTrigger>
			<NavigationItem icon={<IconPencilPlus />}>
				Create a campaign
			</NavigationItem>
		</CreateCampaignTrigger>
	);
};
