import { PropsWithChildren } from "react";
import { Slot } from "../Slot";

type PrintOnly = "landscape" | "portrait" | "all";
const Break = () => {
	return <div data-print="break" />;
};
const Hidden = (props: PropsWithChildren<{ only?: PrintOnly }>) => {
	const direction: Record<PrintOnly, "v-" | "h-" | ""> = {
		landscape: "h-",
		portrait: "v-",
		all: "",
	};
	return (
		<Slot data-print={`${direction[props.only || "all"]}hidden`}>
			{props.children}
		</Slot>
	);
};
const Top = (props: PropsWithChildren) => {
	return <Slot data-print="top">{props.children}</Slot>;
};

export const Print = {
	Break,
	Hidden,
	Top,
};
