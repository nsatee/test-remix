import { Button, Group } from "@mantine/core";
import { IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";

import { InfluencerSocialMediaButton } from "./elements/InfluencerSocialMediaButton";
import { useInfluencerRowProps } from "./influencerRowStore";
import { useHideOnStatus } from "./useHideOnStatus";

export const InfluencerRowSocialMedia = () => {
	const [props] = useInfluencerRowProps();
	const { hideOnStatus } = useHideOnStatus();

	return (
		<>
			{hideOnStatus(
				["Scheduling", "Completed", "Posted"],
				<Group>
					<Button.Group>
						<InfluencerSocialMediaButton
							link={props.instagram?.link}
							value={props.instagram?.value}
							icon={<IconBrandInstagram />}
						/>
						<InfluencerSocialMediaButton
							link={props.tiktok?.link}
							value={props.tiktok?.value}
							icon={<IconBrandTiktok />}
						/>
					</Button.Group>
				</Group>
			)}
		</>
	);
};
