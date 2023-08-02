import { UseFormReturnType } from "@mantine/form";
import { createContext, useContext } from "react";
import { AddGroupInput } from "../../api/services/Group";

export const CreateGroupFormProvider = createContext<
	UseFormReturnType<Partial<AddGroupInput>>
>({} as any);

export const useCreateGroupForm = () => useContext(CreateGroupFormProvider);
