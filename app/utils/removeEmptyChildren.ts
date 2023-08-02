export function removeEmptyChildren(obj: { [key: string]: any }): {
	[key: string]: any;
} {
	const compactObj: { [key: string]: any } = {};

	for (const key in obj) {
		if (typeof obj[key] === "object") {
			const nestedObj = removeEmptyChildren(obj[key]);

			if (Object.keys(nestedObj).length > 0) {
				compactObj[key] = nestedObj;
			}
		} else if (obj[key]) {
			compactObj[key] = obj[key];
		}
	}

	return compactObj;
}
