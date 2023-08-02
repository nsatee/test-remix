import {
	Box,
	Divider,
	Loader,
	MultiSelect,
	Stack,
	Textarea,
	TextInput,
} from "@mantine/core";
import { useMemo } from "react";

import {
	FieldChoices,
	useAirtableSelect,
} from "../../api/services/useAirtableSelect";
import { brandMarketChoice } from "./brandMarketChoice";
import { useCreateBrandForm } from "./create-brand.store";

export const CreateBrandInformationSection = () => {
	const form = useCreateBrandForm();
	const { selectTable, isLoading } = useAirtableSelect(false);
	const fieldChoices = useMemo(() => {
		if (!isLoading) {
			return selectTable({ tableId: FieldChoices.Brand });
		}
	}, [selectTable, isLoading]);

	return (
		<Stack spacing={"lg"}>
			<TextInput
				label="Brand name"
				withAsterisk
				{...form.getInputProps("name")}
			/>
			<MultiSelect
				withAsterisk
				label="Market"
				placeholder="Choose the market"
				searchable
				nothingFound="Not market found"
				maxDropdownHeight={280}
				data={brandMarketChoice}
				{...form.getInputProps("market")}
			/>
			<Textarea label="Description" {...form.getInputProps("description")} />
			<Divider
				my="sm"
				labelPosition="center"
				variant="dashed"
				label={<Box mr={5}>Business type</Box>}
			/>
			<MultiSelect
				searchable
				label="Main business type"
				placeholder="Choose the market"
				nothingFound="Not market found"
				maxDropdownHeight={280}
				data={fieldChoices?.["Business Type"]?.choices.map((v) => v.name) || []}
				{...form.getInputProps("businessType")}
				rightSection={isLoading ? <Loader size="sm" /> : undefined}
			/>
			<MultiSelect
				searchable
				label="Secondary business type"
				placeholder="Choose the market"
				nothingFound="Not market found"
				maxDropdownHeight={280}
				data={
					fieldChoices?.["Business Sub-Type"]?.choices.map((v) => v.name) || []
				}
				{...form.getInputProps("businessSubType")}
				rightSection={isLoading ? <Loader size="sm" /> : undefined}
			/>
		</Stack>
	);
};
