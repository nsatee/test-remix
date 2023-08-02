import { Center } from "@mantine/core";
import { IconBrandTiktok } from "@tabler/icons-react";
import { isEmpty, map } from "lodash";

import { EmptyAlert } from "../../components/EmptyAlert";
import { TikTokPost } from "../../components/TiktokPost";
import { useStyles } from "../../routes/agent/influencer_detail";

export const LatestCollabTiktok = ({ data }: { data: string[] }) => {
	const { classes } = useStyles();
	if (isEmpty(data)) {
		return (
			<EmptyAlert
				icon={<IconBrandTiktok />}
				title="Tiktok Post"
				message="The post is empty."
			/>
		);
	}

	return (
		<div className={classes.instagramContainer}>
			{map(
				data,
				(url) =>
					url && (
						<Center key={url}>
							<TikTokPost url={url} />
						</Center>
					)
			)}
		</div>
	);
};
