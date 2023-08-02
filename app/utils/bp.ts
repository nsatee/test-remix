export const bp = (query: string) => {
	return query.split("@media")[1].trim();
};
