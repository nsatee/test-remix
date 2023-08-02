import { compact, inRange } from "lodash";
import { useMemo } from "react";

export const useStepper = <T extends unknown, Data extends { key: string } & T>(
	defaultValue: number,
	opts: {
		data: Data[];
		onChange?: (value: number) => void;
		forceDisable?: boolean;
		disableAt?: Partial<Record<Data["key"], boolean>>;
		hidden?: Data["key"][];
	}
) => {
	const resultData = compact(
		opts.data.map((data) => {
			if (opts.hidden?.includes(data.key)) return null;
			return data;
		})
	);
	const totalStep = useMemo(() => resultData.length, [resultData]);
	const max = useMemo(() => totalStep - 1, [resultData]);
	const canDecrease = useMemo(
		() => (opts.forceDisable ? false : defaultValue > 0),
		[defaultValue]
	);
	const canIncrease = useMemo(
		() => (opts.forceDisable ? false : inRange(defaultValue, max)),
		[defaultValue, max]
	);
	const increment = () => {
		if (defaultValue >= max) {
			return max;
		}
		opts.onChange?.(defaultValue + 1);
	};

	const decrement = () => {
		if (defaultValue <= 0) {
			return 0;
		}
		opts.onChange?.(defaultValue - 1);
	};

	const setStep = (value: number) => {
		const validValue = inRange(value, 0, max + 1);
		if (validValue) {
			opts.onChange?.(value);
		}
	};

	return [
		resultData[defaultValue],
		{
			increment,
			decrement,
			setStep,
			active: defaultValue,
			canIncrease,
			canDecrease,
			step: defaultValue + 1,
			totalStep,
			onHold: Boolean(
				opts.disableAt?.[resultData[defaultValue].key as Data["key"]]
			),
			resultData,
		},
	] as const;
};
