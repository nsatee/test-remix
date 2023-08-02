export function getItemsFromArray<T>(arr: T[], count: number = 3): T[] {
	return arr.slice(0, count);
}
