import { UseFormReturnType } from "@mantine/form";
import { createContext, useContext } from "react";
import { CreateCampaignInput } from "../../api/services/Campaign";

export const CreateCampaignForm = createContext<
	UseFormReturnType<CreateCampaignInput>
>({} as any);

export const useCreateCampaignForm = () => useContext(CreateCampaignForm);
