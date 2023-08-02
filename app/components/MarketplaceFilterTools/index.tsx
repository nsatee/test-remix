import { Button, Group, Select, Skeleton, SkeletonProps } from "@mantine/core";
import { IconFilterOff } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { DatabaseFieldKey, useDatabaseField } from "../../api/useDatabaseField";

const SelectSkeleton = (props: SkeletonProps) => {
	return <Skeleton w={200} h={36} {...props} />;
};

const MarketSelect = () => {
	const [params, setParams] = useSearchParams();
	const { data, isLoading } = useDatabaseField(DatabaseFieldKey.MARKET);
	const [emptyValue] = useState("All city");
	const choices = useMemo(() => {
		return [emptyValue, ...(data || [])];
	}, [data]);
	if (isLoading) return <SelectSkeleton />;
	return (
		<Select
			value={params.get("market") || choices[0]}
			placeholder="All market"
			onChange={handleChange}
			data={choices}
			variant="filled"
			size="sm"
		/>
	);

	function handleChange(value: string | null) {
		if (emptyValue === value) {
			params.delete("market");
			return setParams(params);
		}
		params.set("market", emptyValue === value ? "" : value!);
		return setParams(params);
	}
};

const AudienceSizeSelect = () => {
	const [params, setParams] = useSearchParams();
	const [emptyValue] = useState("All audience sizes");
	const { data, isLoading } = useDatabaseField(DatabaseFieldKey.AUDIENT_SIZE);
	const choices = useMemo(() => {
		return [emptyValue, ...(data || [])];
	}, [data]);
	if (isLoading) return <SelectSkeleton />;
	return (
		<Select
			value={params.get("audience") || choices[0]}
			placeholder="All audience"
			onChange={handleChange}
			data={choices}
			variant="filled"
			size="sm"
		/>
	);

	function handleChange(value: string | null) {
		if (emptyValue === value) {
			params.delete("audience");
			return setParams(params);
		}
		params.set("audience", emptyValue === value ? "" : value!);
		return setParams(params);
	}
};
const ExpertiseSelect = () => {
	const [params, setParams] = useSearchParams();
	const { data, isLoading } = useDatabaseField(DatabaseFieldKey.EXPERTISE);
	const [emptyValue] = useState("All expertise");
	const choices = useMemo(() => {
		return [emptyValue, ...(data || [])];
	}, [data]);
	if (isLoading) return <SelectSkeleton />;
	return (
		<Select
			value={params.get("expertise") || choices[0]}
			placeholder="All expertise"
			onChange={handleChange}
			data={choices}
			variant="filled"
			size="sm"
		/>
	);

	function handleChange(value: string | null) {
		if (emptyValue === value) {
			params.delete("expertise");
			return setParams(params);
		}
		params.set("expertise", emptyValue === value ? "" : value!);
		return setParams(params);
	}
};

const ClearFilters = () => {
	const [, setParams] = useSearchParams();
	return (
		<Button
			variant="default"
			size="sm"
			leftIcon={<IconFilterOff size="1rem" />}
			onClick={() => {
				setParams({});
			}}
		>
			Clear filters
		</Button>
	);
};

export const MarketplaceFilterTools = () => {
	return (
		<Group>
			<MarketSelect />
			<AudienceSizeSelect />
			<ExpertiseSelect />
			<ClearFilters />
		</Group>
	);
};
