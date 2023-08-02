import { ActionIcon, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";

import { InstagramPost } from "../InstagramPost";
import { InfluencerNoShowButton } from "./elements/InfluencerNoShowButton";
import { useInfluencerRowProps } from "./influencerRowStore";
import { useHideOnStatus } from "./useHideOnStatus";

const IgButton = ({ url }: { url: string }) => {
	return (
		<ActionIcon
			onClick={() => {
				modals.open({
					title: "Instagram preview",
					children: <InstagramPost url={url} compact />,
					size: "sm",
				});
			}}
		>
			<IconBrandInstagram />
		</ActionIcon>
	);
};

export const InfluencerRowCompletedPostInfo = () => {
	const [props] = useInfluencerRowProps();
	const { showOnStatus } = useHideOnStatus();
	if (!props.instagramPost && !props.tiktokPost) return null;
	return (
		<>
			{showOnStatus(
				["Completed"],
				<Group position="right">
					<InfluencerNoShowButton name={props.name} />
				</Group>
			)}
			{showOnStatus(
				["Posted"],

				<Group>
					{props.instagramPost && <IgButton url={props.instagramPost} />}
					{props.tiktokPost && (
						<ActionIcon
							onClick={() => {
								modals.open({
									title: "TikTok preview",
									children: <InstagramPost url={props.tiktokPost!} compact />,
									size: "sm",
								});
							}}
						>
							<IconBrandTiktok />
						</ActionIcon>
					)}
				</Group>
			)}
		</>
	);
};
