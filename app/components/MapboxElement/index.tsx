import {
	GeocodingCore,
	GeocodingFeature,
	GeocodingResponse,
	SearchBoxSuggestionResponse,
} from "@mapbox/search-js-core";
import React, {
	createContext,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

import { useCallback } from "react";

import { useGeolocation } from "rooks";
import mapboxgl from "mapbox-gl";

export type OnMapSelectResult = {
	lat: number;
	lng: number;
	address: string;
};

const initContext = {
	isLoading: false,
	searchResult: null as SearchBoxSuggestionResponse | null,
	map: null as mapboxgl.Map | null,
	geoResult: null as GeocodingResponse | null,
	selectedSearch: null as GeocodingFeature | null,
	geoCore: new GeocodingCore({
		accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
		country: "us",
	}),
	currentLngLat: null as number[] | null,
	inputValue: "",
	searching: false,
	defaultValue: null as OnMapSelectResult | null,
};
export type MapContextType = typeof initContext;

const MapContext = createContext<
	[MapContextType, React.Dispatch<SetStateAction<MapContextType>>]
>([initContext, () => {}]);

export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({
	children,
	defaultValue = null,
}: {
	children: ReactNode;
	defaultValue?: OnMapSelectResult | null;
}) => {
	const [ctx, setCtx] = useState({
		...initContext,
		defaultValue,
		inputValue: defaultValue ? defaultValue.address : "",
	});
	return (
		<MapContext.Provider value={[ctx, setCtx]}>{children}</MapContext.Provider>
	);
};

export const useGeoMap = () => {
	const [{ geoCore }, setState] = useMapContext();
	const geo = useGeolocation();

	const searching = useCallback(
		async (textSearch: string) => {
			const res = await geoCore.forward(textSearch, {
				limit: 5,
				country: "us",
				proximity:
					geo?.lng && geo?.lat
						? new mapboxgl.LngLat(geo.lng, geo.lat)
						: undefined,
			});
			setState((prev) => ({
				...prev,
				geoResult: res,
			}));
		},
		[geoCore, geo]
	);

	return searching;
};
