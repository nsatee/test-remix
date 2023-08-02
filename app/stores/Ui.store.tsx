import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export const uiAtom = atomWithImmer({
	sizes: {
		footer: {
			width: 0,
			height: 0,
		},
		header: {
			width: 0,
			height: 0,
		},
	},
});

export const useUi = () => useAtom(uiAtom);
