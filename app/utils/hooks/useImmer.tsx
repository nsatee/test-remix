import { useState } from "react";
import { Draft, produce } from "immer";

export function useImmer<T>(initialValue: T) {
	const [state, setState] = useState<T>(initialValue);

	const setImmerState = (updater: (draft: Draft<T>) => void) => {
		setState(produce(state, updater));
	};

	return [state, setImmerState] as const;
}
