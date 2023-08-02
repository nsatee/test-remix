import { createContext, useContext } from "react";

import { useImmer } from "./hooks/useImmer";

// export const createImmerStore = <T extends {}>(initialValue: T) => {
// 	const targetAtom = atomWithImmer(initialValue);
// 	const targetScope = Symbol("ModuleA");
// 	const ScopeGuardContext = createContext(targetScope);

// 	function createScopedAtomHook(scope: typeof targetScope) {
// 		return (atom: Parameters<typeof useAtom>[0]) => {
// 			const currentScope = useContext(ScopeGuardContext);
// 			if (scope !== currentScope) {
// 				throw Error("Wrong scope");
// 			}
// 			return useAtom(atom);
// 		};
// 	}

// 	const useScopedAtom = () => createScopedAtomHook(targetScope)(targetAtom);

// 	const Provider = ({ children }: { children: React.ReactNode }) => {
// 		return (
// 			<ScopeGuardContext.Provider value={targetScope}>
// 				{children}
// 			</ScopeGuardContext.Provider>
// 		);
// 	};
// 	return [Provider, useScopedAtom] as const;
// };

export function createImmerStore<T extends {}>(defaultValue: T) {
	const state = () => useImmer(defaultValue);
	const Context = createContext<ReturnType<typeof state>>([
		defaultValue,
		() => {},
	]);
	const store = () => useContext(Context);

	const Provider = ({
		children,
		initValue,
	}: {
		children: React.ReactNode;
		initValue: Partial<T>;
	}) => {
		return (
			<Context.Provider value={[{ ...state()[0], ...initValue }, state()[1]]}>
				{children}
			</Context.Provider>
		);
	};

	return [Provider, store] as const;
}
