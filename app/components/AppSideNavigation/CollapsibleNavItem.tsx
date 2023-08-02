import {
	Collapse,
	Paper,
	Text,
	ThemeIcon,
	UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { cloneElement } from "react";
import { Link } from "react-router-dom";
import { useAppSideNavStyles } from "./useAppSideNavStyles";

export type CollapsibleNavItemProps = Omit<
	CollapsibleNavProps,
	"icon" | "items"
> & { link: string };

export type CollapsibleNavProps = {
	label: string;
	icon: JSX.Element;
	items: CollapsibleNavItemProps[];
};
export const CollapsibleNavItem = ({
	label,
	icon: Icon,
	items,
}: CollapsibleNavProps) => {
	const { classes } = useAppSideNavStyles();
	const [isOpen, handleOpen] = useDisclosure();

	const subLinks = items.map((linkData) => (
		<Text
			className={classes.dropdownLink}
			key={linkData.label}
			component={Link}
			to={linkData.link}
		>
			{linkData.label}
		</Text>
	));

	return (
		<>
			<UnstyledButton
				// href="#"
				className={classes.link}
				w="100%"
				onClick={handleOpen.toggle}
			>
				<>
					{cloneElement(Icon, {
						className: classes.linkIcon,
						stroke: 1.5,
					})}
				</>
				<span>{label}</span>
				<Paper sx={{ marginLeft: "auto", background: "transparent" }}>
					<ThemeIcon
						size="sm"
						variant="default"
						sx={(theme) => ({
							background: "none",
							border: 0,
							color: theme.colors.gray[6],
							transition: "200ms",
							transform: `rotate(${isOpen ? "90deg" : "0deg"})`,
						})}
					>
						<IconChevronRight size="1.2rem" />
					</ThemeIcon>
				</Paper>
			</UnstyledButton>
			<Collapse in={isOpen}>{subLinks}</Collapse>
		</>
	);
};
