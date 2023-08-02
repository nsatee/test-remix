import { useState } from "react";

export const useStorageState = <T extends {}>(key: string, initValue: T) => {
	const [state, setState] = useState<T>({
		...initValue,
		...JSON.parse(localStorage.getItem(key) || "{}"),
	});

	const handleChange = (value: Partial<T>) => {
		setState((prev) => {
			const result = { ...prev, ...value };
			localStorage.setItem(key, JSON.stringify(result));
			return result;
		});
	};

	return [state, handleChange] as const;
};
