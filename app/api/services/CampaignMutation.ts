import { atb, atbQuery } from "../atb";

export const http_getNeighborhoodByMarket = ({
	market,
}: {
	market?: string;
}) => {
	return atb.brand<NeighborhoodType>(
		atbQuery(`
    query GetAreaByMarket($market: String) {
      neighborhoods(market: $market) {
        id
        neighborhood
      }
    }
  `),
		{
			market,
		}
	);
};

export const http_getBrandLocation = ({ brandId }: { brandId: string }) => {
	return atb.brand<NeighborhoodType>(
		atbQuery(`
    query GetLocationsByBrandId($brandId: String) {
      brands(id: $brandId) {
				locations {
					id
					title
				}
      }
    }
  `),
		{
			brandId,
		}
	);
};

export interface BrandItemData {
	brands: BrandItem[];
}
export interface BrandItem {
	locations: LocationFromBrandItem[];
}
export interface LocationFromBrandItem {
	id: string;
	title: string;
}

export interface NeighborhoodType {
	neighborhoods: Neighborhood[];
}

export interface Neighborhood {
	id: string;
	neighborhood: string;
}
