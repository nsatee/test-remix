import { useQuery } from "@tanstack/react-query";
import { atb, atbQuery } from "./atb";
import { sortedUniq } from "lodash";

export enum DatabaseFieldKey {
	MARKET = "fldfxjnhmm0qs0Fne",
	AUDIENT_SIZE = "fldnUVt3N60NtCo43",
	EXPERTISE = "fldX9Fglt7Ll2c8TZ",
}

type FieldDataType = { fieldValues: { value: string }[] };

export const useDatabaseField = (id: DatabaseFieldKey) => {
	const query = useQuery(
		["market-fields", id],
		async () => {
			const res = await atb.creator<FieldDataType>(
				atbQuery(`
			query GetFieldDatabase ($id: String) {
				fieldValues(fieldId: $id) {
					value
				}
			}
		`),
				{
					id,
				}
			);

			const result = res?.fieldValues?.[0]?.value?.split(" | ") || [];
			return sortedUniq(result);
		},
		{
			suspense: false,
		}
	);

	return query;
};
