export function mapObject<T, U>(
	obj: { [key: string]: T },
	mapper: (value: T, key: string) => U
): { [key: string]: U } {
	const mappedObj: { [key: string]: U } = {};

	for (const key in obj) {
		const value = obj[key];
		const mappedValue = mapper(value, key);
		mappedObj[key] = mappedValue;
	}

	return mappedObj;
}
