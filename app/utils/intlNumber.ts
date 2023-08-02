import { onlyNumber } from "./onlyNumber";

let instant = Intl.NumberFormat("en", { notation: "compact" });
export const intlUnit = (value: number | bigint = 0) => {
	return instant.format(value);
};

export const formatNumber = (val: any) =>
	new Intl.NumberFormat("en-US", {
		maximumSignificantDigits: 3,
	}).format(onlyNumber(val));
