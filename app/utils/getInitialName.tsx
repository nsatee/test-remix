import { take } from "lodash";

export const getInitialName = (name?: string | null, fb: any = "") => {
	if (!name) return fb;
	return take(name.split(" "), 2)
		.map((target) => target[0])
		.join("");
};
