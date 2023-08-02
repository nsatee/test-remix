import { UseFormReturnType } from "@mantine/form";
import { createContext, useContext } from "react";
import { SetupPreferenceInputType } from "../../api/services/SetupPreferences";
import { createImmerStore } from "../../utils/createScopeStore";

export const FormContext = createContext<
	UseFormReturnType<SetupPreferenceInputType>
>({} as any);

export const usePreferencesForm = () => useContext(FormContext);
export const [PreferenceImages, usePreferencesImages] = createImmerStore<{
	value: string[];
}>({ value: [] });
