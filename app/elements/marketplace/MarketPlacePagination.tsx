import { Affix, Button, Group, Paper, rem } from "@mantine/core";
import { usePagination, useWindowScroll } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { MARKETPLACE_PAGE_SIZE } from "../../api/services/SearchInfluencer";

export const MarketPlacePagination = ({
	pageTotal = 0,
}: {
	pageTotal?: number;
}) => {
	const [params, setParams] = useSearchParams();
	const [, scrollTo] = useWindowScroll();
	const pagination = usePagination({
		total: 999999999,
		initialPage: +(params.get("page") || "1"),
		onChange: (page) => {
			params.set("page", page.toString());
			setParams(params);
			scrollTo({ y: 0 });
		},
	});

	return (
		<Affix position={{ bottom: rem(20), right: rem(20) }}>
			<Paper p="0.4rem" shadow="md" withBorder radius={"lg"}>
				<Group spacing={"sm"}>
					<Button
						leftIcon={<IconChevronLeft />}
						variant="light"
						onClick={pagination.previous}
						disabled={pagination.active <= 1}
					>
						Prev
					</Button>

					<Button
						rightIcon={<IconChevronRight />}
						variant="light"
						onClick={pagination.next}
						disabled={pageTotal < MARKETPLACE_PAGE_SIZE || pageTotal === 0}
					>
						Next
					</Button>
				</Group>
			</Paper>
		</Affix>
	);
};
