import {
	AspectRatio,
	Box,
	Center,
	Paper,
	rem,
	Skeleton,
	Stack,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { IconUserSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fromPairs, values } from "lodash";
import { useSearchParams } from "react-router-dom";
import { http_getInfluencers } from "../../api/services/SearchInfluencer";
import { InfluencerDetailCard } from "../../components/InfluencerDetailCard";
import { MarketPlacePagination } from "../marketplace/MarketPlacePagination";
import { createRandomStringArray } from "../../utils/createRandomStringArray";
import { InfluencerGrid } from "./InfluencerGrid";

export const InfluencerList = () => {
	const [params] = useSearchParams();
	const theme = useMantineTheme();
	const { data, isLoading } = useQuery(
		[
			"http_getInfluencers",
			...values(fromPairs([...params.entries()])),
			params.get("page") || 1,
		],
		async () => {
			const res = await http_getInfluencers({
				page: +(params.get("page") || "1"),
				market: params.get("market")!,
				audienceSize: params.get("audience")!,
				expertise: params.get("expertise")!,
			});
			return res;
		},
		{
			suspense: false,
		}
	);

	if (isLoading)
		return (
			<InfluencerGrid>
				{createRandomStringArray(10).map((key) => (
					<Skeleton key={key} w={"100%"} h={400} />
				))}
			</InfluencerGrid>
		);
	if (!data?.length) {
		return (
			<Stack mt={rem(60)} spacing={"lg"}>
				<Center
					component={AspectRatio}
					ratio={1}
					w="100%"
					maw={rem(240)}
					mx="auto"
				>
					<Paper bg="gray.1" radius={"xl"}>
						<IconUserSearch size={rem(160)} color={theme.colors.gray[5]} />
					</Paper>
				</Center>
				<Stack ta="center" maw={rem(320)} mx="auto" spacing={"xs"}>
					<Title order={4}>Aww...</Title>
					<Text color="dimmed" size="sm">
						Every day, we're adding more influencers to our list. If you're
						interested in learning more about Wise, be sure to check back later.
					</Text>
				</Stack>
			</Stack>
		);
	}
	return (
		<Box pos="relative">
			<InfluencerGrid>
				{data?.map((influencer) => (
					<InfluencerDetailCard key={influencer.id} influencer={influencer} />
				))}
			</InfluencerGrid>
			<MarketPlacePagination pageTotal={data?.length} />
		</Box>
	);
};
