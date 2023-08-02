/**
 * Create an array with random key for base on passed total
 * @param total number
 * @returns
 */
export function createRandomStringArray(total: number = 1): string[] {
	const randomStrings: string[] = [];

	for (let i = 0; i < total; i++) {
		const randomString = Math.random().toString(36).substring(7);
		randomStrings.push(randomString);
	}

	return randomStrings;
}
