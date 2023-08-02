import { useState } from "react";

export const useBoolean = (
	defaultValue: boolean = false,
	cb?: Partial<{
		on: () => void;
		off: () => void;
		toggle: (status: boolean) => void;
	}>
) => {
	const [state, setState] = useState(defaultValue);

	return [
		state,
		{
			on: () => {
				cb?.on?.();
				setState(true);
			},
			off: () => {
				cb?.off?.();
				setState(false);
			},
			toggle: () => {
				!state ? cb?.on?.() : cb?.off?.();
				setState((prev) => !prev);
			},
		},
	] as const;
};
