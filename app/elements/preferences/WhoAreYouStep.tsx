import { Radio, Stack } from "@mantine/core";
import { map } from "lodash";

import { CheckboxCard } from "../../components/CheckboxCard";
import { usePreferencesForm } from "./preferenceFormContext";

type CreatorType = "Creator" | "Brand" | "Group";
const accountFormData = {
	Creator: {
		title: "Creator",
		desc: "I'm a content creator or influencer looking for sponsors.",
	},
	Brand: {
		title: "Brand",
		desc: "I'm a brand looking for influencers to promote my business.",
	},
	Group: {
		title: "Group",
		desc: "I'm a restaurant group or agency managing multiple brands.",
	},
} as Record<CreatorType, { title: string; desc: string }>;

export const WhoAreYouStep = () => {
	const form = usePreferencesForm();

	return (
		<Radio.Group {...form.getInputProps("type")}>
			<Stack>
				{map(accountFormData, (account) => (
					<CheckboxCard
						key={account.title}
						title={account.title}
						description={account.desc}
						value={account.title}
					/>
				))}
			</Stack>
		</Radio.Group>
	);
};
