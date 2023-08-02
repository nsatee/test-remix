import { compact } from "lodash";
import { Nullish } from "./utilityType";

export const fullname = (
	firstname: Nullish<string>,
	lastname: Nullish<string>,
	fallback = ""
): string => {
	if (!firstname) return fallback;
	return compact([firstname, lastname]).join(" ").trim();
};
