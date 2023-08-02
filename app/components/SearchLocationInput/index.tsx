import { Text, TextInput, TextInputProps, UnstyledButton } from "@mantine/core";
import { GeocodingFeature } from "@mapbox/search-js-core";
import { compact, isEmpty } from "lodash";
import { useEffect } from "react";

import {
	MapProvider,
	useGeoMap,
	useMapContext,
} from "../../components/MapboxElement";

export type ParseAddressKeys =
	| "neighborhood"
	| "postcode"
	| "city"
	| "district"
	| "region"
	| "country"
	| "address"
	| "fullAddress";

export type ParseAddressResult = Partial<Record<ParseAddressKeys, string>>;

const parseAddress = (address: GeocodingFeature) => {
	let result: ParseAddressResult = {};
	address.context?.forEach((val) => {
		const keyName = val.id.split(".")?.[0];
		const formatKeyName = keyName === "place" ? "city" : keyName;
		result[formatKeyName as ParseAddressKeys] =
			keyName === "region" ? val.short_code?.split("-")?.[1] : val.text;
	});

	const addressData =
		address.properties.address ||
		compact([address.address, address.text]).join(" ");

	return {
		...result,
		address: addressData,
		fullAddress: compact([
			addressData,
			result.city,
			compact([result.region, result.postcode]).join(" "),
		]).join(", "),
	};
};

export type SearchLocationInputProps = Omit<TextInputProps, "onChange"> & {
	onChange?: (val: string) => void;
	onObjectChange?: (val: ParseAddressResult) => void;
};
export const SearchResult = (props: SearchLocationInputProps) => {
	const [{ geoResult, searching }, setState] = useMapContext();
	if (!searching) return null;

	return (
		<div>
			<div>
				{geoResult?.features?.map((place) => (
					<UnstyledButton
						key={place.id}
						w="100%"
						px="sm"
						py="xs"
						onClick={async () => {
							if (place.place_name) {
								const parsed = parseAddress(place);
								const fullAddress = parsed.fullAddress;
								props.onChange?.(fullAddress);
								props.onObjectChange?.(parsed);
								setState((prev) => ({
									...prev,
									inputValue: fullAddress,
									geoResult: null,
									searching: false,
									selectedSearch: place,
								}));
							}
						}}
						sx={(theme) => ({
							borderBottom: `1px solid ${theme.colors.gray[3]}`,
							"&:hover": {
								background: theme.colors.gray[2],
							},
						})}
					>
						<Text>{parseAddress(place).address}</Text>
						{place.place_name && (
							<Text color="dimmed" size="xs">
								{parseAddress(place).fullAddress}
							</Text>
						)}
					</UnstyledButton>
				))}
			</div>
		</div>
	);
};

export const SearchInput = ({
	onObjectChange,
	...props
}: SearchLocationInputProps) => {
	const [{ inputValue }, setState] = useMapContext();
	const search = useGeoMap();

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!isEmpty(inputValue)) {
				search(inputValue);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [inputValue]);
	return (
		<>
			<TextInput
				{...props}
				value={inputValue}
				onChange={(e) => {
					setState((prev) => ({
						...prev,
						inputValue: e.target.value,
						searching: true,
						defaultValue: null,
					}));
				}}
			/>
		</>
	);
};

export const SearchLocationInput = (props: SearchLocationInputProps) => {
	return (
		<MapProvider>
			<SearchInput {...props} />
			<SearchResult {...props} />
		</MapProvider>
	);
};
