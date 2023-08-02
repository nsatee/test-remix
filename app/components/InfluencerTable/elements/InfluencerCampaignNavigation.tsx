import { Button, Menu, Text } from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";

import { useInfluencerRowProps } from "../influencerRowStore";
import { useInfluencerItemStyles } from "../useInfluencerItemStyles";
import { useMediaQuery } from "@mantine/hooks";
import { bp } from "../../../utils/bp";
import { Link } from "react-router-dom";

export const InfluencerCampaignNavigation = () => {
	const [{ campaigns }] = useInfluencerRowProps();
	const { theme } = useInfluencerItemStyles();
	const matches = useMediaQuery(bp(theme.fn.smallerThan("md")));

	return campaigns?.map((campaign) =>
		campaign.locations?.length ? (
			campaign.locations.length === 1 ? (
				<Button
					size="xs"
					compact
					variant="default"
					key={campaign.id}
					component={Link}
					to={`/agent/campaign-application/${campaign.id}`}
				>
					<Text lineClamp={1}>{campaign.title}</Text>
				</Button>
			) : (
				<Menu key={campaign.id} position={matches ? "bottom" : "bottom-end"}>
					<Menu.Target>
						<Button
							size="xs"
							compact
							variant="default"
							rightIcon={<IconSelector size="0.8rem" />}
						>
							<Text lineClamp={1}>{campaign.title}</Text>
						</Button>
					</Menu.Target>
					<Menu.Dropdown>
						{campaign.locations.map((location) => (
							<Menu.Item
								key={location.id}
								component={Link}
								to={`/agent/campaign-application/${campaign.id}`}
							>
								{location.name}
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			)
		) : null
	);
};
