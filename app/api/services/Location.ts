import { atb, atbQuery } from "../atb";

export type LocationFromResponse = {
	id: string;
	locationName: string;
	fullAddress: string;
	title: string;
};

export interface GetLocationsByBrandIdResponse {
	brands: Brand[];
	locations: LocationFromResponse[];
}

interface Brand {
	id: string;
	name: string;
}

export type InsertLocationInput = {
	title: string;
	streetAddress: string;
	brand: string;
	city: string;
	state: string;
	zip: string;
};

export const http_getLocationsByBrandId = async ({
	brandId,
}: {
	brandId: string;
}) => {
	const res = await atb.brand<GetLocationsByBrandIdResponse>(
		atbQuery(`
    query GetLocationsByBrandId($brandId: String) {
      brands(id: $brandId) {
        id
        name
      }
      locations(_filter: {
        brandId: $brandId, 
      }, _order_by: "title") {
        id
        locationName
        fullAddress
        title
      }
    }  
  `),
		{
			brandId,
		}
	);

	return res;
};

export const http_createNewLocation = (input: InsertLocationInput) => {
	const res = atb.brand(
		atbQuery(`
  mutation InsertLocation(
		$title: String
		$streetAddress: String
		$brand: [String]
    $city: String
    $state: String
    $zip: String
	) {
		insert_locations(
			title: $title
			streetAddress: $streetAddress
			brand: $brand
      city: $city
      state: $state
      zip: $zip
		) {
			id
		}
	}
  `),
		input
	);

	return res;
};
