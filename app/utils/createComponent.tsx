import { createPolymorphicComponent } from "@mantine/core";
import { forwardRef } from "react";

export const createComponent = <
	InitElm extends keyof JSX.IntrinsicElements,
	Elm extends HTMLElement,
	Props extends {}
>(
	component: (props: Props, ref: React.ForwardedRef<Elm>) => React.ReactNode
) => {
	const _component = forwardRef<Elm, Props>(component);
	return createPolymorphicComponent<InitElm, Props>(_component);
};
