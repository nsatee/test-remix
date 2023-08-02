import { IconAward, IconDiscountCheck } from "@tabler/icons-react";
import { compact } from "lodash";
import { Link } from "react-router-dom";

import { Membership } from "../../api/services/SearchInfluencer";
import { InfluencerResult } from "../../api/services/SearchInfluencerWithText";
import { InfluencerBadge } from "../../components/InfluencerBadge";
import { UserListItem } from "../../components/UserListItem";
import { fullname } from "../../utils/fullname";

export const UserItem = ({ influencer }: { influencer: InfluencerResult }) => {
	return (
		<UserListItem
			component={Link}
			to={`/agent/influencer/${influencer.id}`}
			thumbnail={influencer.headshot?.[0]?.thumbnails?.large?.url}
			badges={compact([
				influencer.top && (
					<InfluencerBadge size="md" icon={<IconAward />} variant="outline">
						Top influencer
					</InfluencerBadge>
				),
				influencer.membership === Membership.VerifiedMember && (
					<InfluencerBadge
						variant="outline"
						size="md"
						icon={<IconDiscountCheck />}
						color="green"
					>
						Verified
					</InfluencerBadge>
				),
			])}
			title={fullname(
				influencer.firstName,
				influencer.lastName,
				influencer.name
			)}
			description={influencer.market}
		/>
	);
};
