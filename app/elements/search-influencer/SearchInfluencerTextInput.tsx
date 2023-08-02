import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

import { SEARCH_PAGE_PARAM } from "./LoadMoreInfluencerButton";

export const SEARCH_PARAMS_KEY = "search";

export const SearchInfluencerTextInput = () => {
	const [params, setParams] = useSearchParams();
	return (
		<TextInput
			value={params.get(SEARCH_PARAMS_KEY) || ""}
			icon={<IconSearch />}
			placeholder="Influencer's name"
			size="lg"
			onChange={(e) => {
				const value = e.target.value;
				params.delete(SEARCH_PAGE_PARAM);
				if (!value) {
					params.delete(SEARCH_PARAMS_KEY);
					return setParams(params);
				}
				params.set(SEARCH_PARAMS_KEY, value);
				return setParams(params, { replace: true });
			}}
		/>
	);
};
