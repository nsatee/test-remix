import { Center } from "@mantine/core";
import { IconBrandInstagram } from "@tabler/icons-react";
import { isEmpty, map, shuffle } from "lodash";

import { EmptyAlert } from "../../components/EmptyAlert";
import { InstagramPost } from "../../components/InstagramPost";
import { useStyles } from "../../routes/agent/influencer_detail";

export const LatestCollabInstagram = ({ data }: { data: string[] }) => {
	const { classes } = useStyles();
	if (isEmpty(data)) {
		return (
			<EmptyAlert
				icon={<IconBrandInstagram />}
				title="Instagram Post"
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
						<Center
							key={shuffle(url).join("")}
							mb="sm"
							component={"a"}
							href={url}
							target="_blank"
						>
							<InstagramPost url={url} />
						</Center>
					)
			)}
		</div>
	);
};
