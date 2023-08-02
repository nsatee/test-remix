import { toNumber } from "lodash";

export const parseCurrency = (value?: number | string | null) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		compactDisplay: "short",
		notation: "compact",
	}).format(toNumber(value || 0));
};
