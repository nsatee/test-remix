import { SimpleGrid, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
	ApplicationsEntity,
	http_getLatestCollabs,
} from "../../api/services/Dashboard";
import { SmallLatestInfluencerCard } from "../../components/SmallLatestInfluencerCard";
import { useMe } from "../../stores/Me.store";
import { fullname } from "../../utils/fullname";

export const LatestCollabsList = () => {
	const [me] = useMe();
	const { data } = useQuery(["latest-collabs"], async () => {
		const res = await http_getLatestCollabs({ email: me?.user.email_address });
		return res;
	});
	if (!data?.length) return null;
	return (
		<Stack>
			<Title order={2}>Latest collabs</Title>
			<SimpleGrid
				cols={3}
				breakpoints={[
					{ maxWidth: "lg", cols: 2 },
					{ maxWidth: "md", cols: 1 },
				]}
			>
				{data?.map(renderCard)}
			</SimpleGrid>
		</Stack>
	);

	function renderCard(influencer: ApplicationsEntity) {
		const creator = influencer.creator?.[0];
		return (
			<SmallLatestInfluencerCard
				id={influencer.creator?.[0]?.targetId || ""}
				key={influencer.id}
				name={fullname(creator?.firstName, creator?.lastName, creator?.name)}
				postedAt={influencer.postedDate}
				thumbnail={creator?.headshot?.[0].thumbnails.large.url}
				instagramLink={influencer.igPost}
				tiktokLink={influencer.tikTokPost}
			/>
		);
	}
};
