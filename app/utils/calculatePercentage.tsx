export function calculatePercentage(value: number, total: number) {
	if (total === 0) {
		return 0; // Avoid division by zero error
	}

	const percentage = (value / total) * 100;
	return +percentage.toFixed(2);
}
