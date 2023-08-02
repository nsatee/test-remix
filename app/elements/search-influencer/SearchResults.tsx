import { Badge, Box, Flex, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
	IconHourglassHigh,
	IconMoodEmpty,
	IconSearch,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { chunk, flatten, isEmpty, take } from "lodash";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { http_searchInfluencers } from "../../api/services/SearchInfluencerWithText";
import { EmptyAlert } from "../../components/EmptyAlert";
import { ScrollToTopButton } from "../../components/ScrollToTopButton";
import {
	LoadMoreInfluencerButton,
	SEARCH_PAGE_PARAM,
} from "./LoadMoreInfluencerButton";
import { SEARCH_PARAMS_KEY } from "./SearchInfluencerTextInput";
import { UserItem } from "./UserItem";

export const SearchResults = () => {
	const [params] = useSearchParams();
	const [searchText] = useDebouncedValue(params.get(SEARCH_PARAMS_KEY), 300);
	const { data = null, isFetching } = useQuery(
		["http_searchInfluencers", searchText],
		async () => {
			if (!searchText) return null;
			const res = await http_searchInfluencers({ text: searchText });
			return res || [];
		},
		{
			suspense: false,
			enabled: Boolean(searchText),
		}
	);

	const influencerChunk = useMemo(() => chunk(data, 100), [data]);

	if (params.get(SEARCH_PARAMS_KEY) === null) {
		return (
			<EmptyAlert
				icon={<IconSearch />}
				title="Search influencer"
				message="Please enter influencer username to search."
			/>
		);
	}

	if (!isFetching && isEmpty(data)) {
		return (
			<EmptyAlert
				icon={<IconMoodEmpty />}
				title="Search influencer"
				message="Influencer is not found."
			/>
		);
	}

	if (isFetching) {
		return (
			<EmptyAlert
				icon={<IconHourglassHigh />}
				title="Search influencer"
				message="We are searching..."
			/>
		);
	}
	return (
		<Stack>
			<Flex>{data?.length && <Badge>Result: {data.length}</Badge>}</Flex>
			<Box display={"grid"}>
				{flatten(
					take(influencerChunk, +(params.get(SEARCH_PAGE_PARAM) || "1"))
				)?.map((influencer) => (
					<UserItem key={influencer.id} influencer={influencer} />
				))}
				<LoadMoreInfluencerButton total={influencerChunk.length} />
			</Box>
			<ScrollToTopButton />
		</Stack>
	);
};
