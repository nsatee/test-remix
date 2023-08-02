import { take } from "lodash";
import { cloneElement, Fragment } from "react";

export const LimitTotalRendering = <T extends any>({
	data,
	extractKey,
	element,
	trailing,
	limit = 3,
}: {
	data: T[];
	extractKey: (key: T) => string | number;
	element: (key: T) => JSX.Element;
	trailing?: ((remainTotal: number) => React.ReactNode | null) | null;
	limit?: number;
}) => {
	return (
		<>
			{take(data, limit).map((target) => {
				return (
					<Fragment key={extractKey(target)}>
						{cloneElement(element(target))}
					</Fragment>
				);
			})}
			{data.length <= limit ? null : trailing && trailing(data.length - limit)}
		</>
	);
};
