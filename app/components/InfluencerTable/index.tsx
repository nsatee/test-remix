import { Alert, Button, Stack, Text } from "@mantine/core";

import { Application } from "../../api/services/AllInfluencer";
import { fullname } from "../../utils/fullname";
import { InfluencerCampaignNavigation } from "./elements/InfluencerCampaignNavigation";
import { InfluencerRowActionMenu } from "./InfluencerRowActionMenu";
import { InfluencerRowCompletedPostInfo } from "./InfluencerRowCompletedPostInfo";
import { InfluencerRowHeader } from "./InfluencerRowHeader";
import { InfluencerRowInfoGroup } from "./InfluencerRowInfoGroup";
import { InfluencerRowMarketType } from "./InfluencerRowMarketType";
import { InfluencerRowPassBadge } from "./InfluencerRowPassBadge";
import { InfluencerRowPassButton } from "./InfluencerRowPassButton";
import { InfluencerRowSchedulingAction } from "./InfluencerRowSchedulingAction";
import { InfluencerRowSocialMedia } from "./InfluencerRowSocialMedia";
import { Provider } from "./influencerRowStore";
import { InfluencerScheduleTime } from "./InfluencerScheduleTime";
import { useHideOnStatus } from "./useHideOnStatus";
import { useInfluencerItemStyles } from "./useInfluencerItemStyles";
import { WiseLogo } from "../WiseLogo";
import { useMe } from "../../stores/Me.store";

export const InfluencerTierAlert = ({ totalLeft }: { totalLeft: number }) => {
	const [me] = useMe();
	const shouldShow = () => {
		if (!me?.myAirtable?.tier) return true;
		if (me.myAirtable.tier.includes("Tier III")) return false;
		if (totalLeft > 0) return true;
		return false;
	};
	return (
		shouldShow() && (
			<Alert
				title="Connect more deeply with your audience through your brand"
				icon={<WiseLogo />}
			>
				<Stack align="flex-start">
					<Text>
						{totalLeft > 0
							? `Upgrade your account to see ${totalLeft} more of your influencers.`
							: `Upgrade your account to see all influencers.`}
					</Text>
					<Button
						fw="bold"
						variant="outline"
						size="xs"
						component="a"
						href="https://wiseassistant.com/prices"
						target="_blank"
					>
						Upgrade now
					</Button>
				</Stack>
			</Alert>
		)
	);
};

export function InfluencerTable(props: Application) {
	const creator = props.creator[0];
	const { classes, cx } = useInfluencerItemStyles();
	const { showOnStatus } = useHideOnStatus();
	return (
		<Provider
			initValue={{
				influencerId: creator.targetId,
				name: fullname(creator.firstName, creator.lastName, creator.name),
				status: props.status,
				location: creator.market || "Not provided",
				thumbnail: props.headshotFromCreator?.[0]?.thumbnails?.large?.url,
				blurThumbnail: props.headshotFromCreator?.[0]?.thumbnails?.small?.url,
				types: creator.creatorType || [],
				scheduled: props.locationTimeDisplay,
				instagram: {
					link: props.creatorIgHandle?.[0],
					value: +(props.igFollowersFromCreator || "0"),
				},
				tiktok: {
					link: props.tikTokHandle?.[0],
					value: +(props.ttFollowers || "0"),
				},
				instagramPost: props.igPost,
				tiktokPost: props.tikTokPost,
				campaigns: props.campaign.map((camp) => ({
					id: camp.id,
					title: camp.title || "Untitled",
					locations: camp.locations.map((loc) => ({
						id: loc.id,
						name: loc.locationName || "Untitled",
					})),
				})),
				scheduling: {
					email: creator.emailAddress,
					phone: creator.phoneNumber,
				},
			}}
		>
			<div className={classes.root}>
				<InfluencerRowHeader />
				<div className={classes.container}>
					<InfluencerRowInfoGroup />
					<div className={classes.infoGroup}>
						<InfluencerScheduleTime />
						<InfluencerRowMarketType />
						<InfluencerRowSocialMedia />
						<Stack spacing={"xs"}>
							<InfluencerRowSchedulingAction
								email={props.creator?.[0]?.emailAddress}
								phone={props.creator?.[0]?.phoneNumber}
								applicationId={props.id}
								isReminded={Boolean(props.reminderDate)}
							/>
							{showOnStatus(["Passed"], <InfluencerCampaignNavigation />)}
						</Stack>
					</div>
					<div className={cx(classes.alignEnd, classes.approvalGroup)}>
						<InfluencerRowCompletedPostInfo />
						<InfluencerRowPassBadge />
						<InfluencerRowPassButton applicationId={props.id} />
						<InfluencerRowActionMenu applicationId={props.id} />
					</div>
				</div>
			</div>
		</Provider>
	);
}
