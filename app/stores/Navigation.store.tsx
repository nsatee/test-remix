import { atom, useAtom } from "jotai";

export const sideNavigationActiveOnMobile = atom(false);
export const useSideNavigationActiveOnMobile = () =>
	useAtom(sideNavigationActiveOnMobile);
