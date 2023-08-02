import { isEmpty, isFunction } from "lodash";

const createChecker = (reg: RegExp | ((val: any) => boolean)) => {
	return (value: any, msg?: string, allowEmpty?: boolean) => {
		if (allowEmpty && isEmpty(value)) return false;
		const valid = isFunction(reg) ? reg(value) : new RegExp(reg).test(value);
		return !valid ? msg || true : undefined;
	};
};

export const checkEmail = createChecker(
	/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
);
export const checkUrl = createChecker(
	/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i
);
export const checkEmpty = (value: any, msg?: string, allowEmpty?: boolean) => {
	if (allowEmpty && isEmpty(value)) return false;
	const valid = !isEmpty(value);
	return !valid ? msg : undefined;
};
export const checkPhone = (
	value: string,
	msg?: string,
	allowEmpty?: boolean
) => {
	if (allowEmpty && isEmpty(value)) return false;
	const valid = new RegExp(/^\(\d{3}\) \d{3}-\d{4}$/).test(
		value.split("_").join("")
	);
	return !valid ? msg : undefined;
};
