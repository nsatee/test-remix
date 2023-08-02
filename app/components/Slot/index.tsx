import { PropsWithChildren, cloneElement } from "react";

export function Slot<T>({ children, ...props }: PropsWithChildren<T>) {
	return <>{cloneElement(children as JSX.Element, props)}</>;
}
