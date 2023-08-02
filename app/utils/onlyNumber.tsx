import { isNaN, isNumber, isString } from "lodash";

export const onlyNumber = (value: any) => {
	if (value === null) return 0;
	if (isNumber(value)) return value;
	if (value === "") return 0;
	if (Array.isArray(value) && !value.length) return 0;
	if (isString(value)) {
		if (isNaN(+value)) {
			return 0;
		}
		return +value;
	}
	return value;
};
