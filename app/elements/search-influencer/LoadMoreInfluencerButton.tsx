import { Button, Center } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { IconChevronsDown } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

export const SEARCH_PAGE_PARAM = "page";

export const LoadMoreInfluencerButton = (props: { total: number }) => {
	const [params, setParams] = useSearchParams();
	const pagination = usePagination({
		total: props.total,
		page: +(params.get(SEARCH_PAGE_PARAM) || "1"),
		onChange: (p) => {
			params.set(SEARCH_PAGE_PARAM, p.toString());
			setParams(params);
		},
	});

	if (props.total <= 1) return null;
	if (props.total === pagination.active) return null;
	return (
		<Center mt="xl">
			<Button
				onClick={pagination.next}
				variant="light"
				leftIcon={<IconChevronsDown />}
			>
				Load more influencers
			</Button>
		</Center>
	);
};
