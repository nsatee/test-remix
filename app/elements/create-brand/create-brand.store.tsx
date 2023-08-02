import { UseFormReturnType } from "@mantine/form";
import { createContext, useContext } from "react";
import { InsertBrandInput } from "../../api/services/Brand";

export const CreateGroupBrandProvider = createContext<
	UseFormReturnType<InsertBrandInput>
>({} as any);

export const useCreateBrandForm = () => useContext(CreateGroupBrandProvider);
