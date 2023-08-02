import { useQuery } from "@tanstack/react-query";
import { print } from "graphql";
import gql from "graphql-tag";
import { isEmpty } from "lodash";

import { atb } from "../atb";
import sortBy from "sort-by";

export enum FieldChoices {
	CREATE_CAMPAIGN = "tbltNU0dcZdLJkVSo",
	GROUP = "tblTWWUYPqAWWiWzM",
	Brand = "tblsLqBcNLMkVDDd2",
}

const airtableSelectField = print(gql`
	{
		choiceFieldCollection {
			id
			table
			name
			data
		}
	}
`);

export interface AirtableSelectFieldResponse {
	choiceFieldCollection: ChoiceFieldCollection[];
}

export interface ChoiceFieldCollection {
	id: string;
	table: string;
	name: string;
	data: null | string;
}

export type SelectChoiceReturn = Record<
	string,
	{
		type: string;
		choices: SelectChoiceItem[];
	}
>;

export interface SelectChoiceItem {
	id: string;
	name: string;
}

export const useAirtableSelect = (suspense = true) => {
	const { data: result, isLoading } = useQuery(
		["form-select", window.location.href],
		async () => {
			const res = await atb.brand<AirtableSelectFieldResponse>(
				airtableSelectField
			);
			return res.choiceFieldCollection;
		},
		{
			suspense,
		}
	);

	const selectTable = ({ tableId }: { tableId: FieldChoices }) => {
		const targetTable = result?.find((t) => t.table === tableId);
		const fieldsResult = (!isEmpty(targetTable?.data) &&
			JSON.parse(targetTable!.data!)) as SelectChoiceReturn | undefined;
		return fieldsResult;
	};

	const selectField = ({
		fields,
		name,
		sorted = true,
	}: {
		fields?: SelectChoiceReturn;
		name: string;
		sorted?: boolean;
	}) => {
		return {
			...fields?.[name],
			choices: sorted
				? fields?.[name].choices.sort(sortBy("name")) || []
				: fields?.[name].choices || [],
		};
	};

	return {
		result: result,
		isLoading,
		selectTable,
		selectField,
	};
};
