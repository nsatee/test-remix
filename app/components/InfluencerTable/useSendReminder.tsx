import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http_sendReminderOnApplication } from "../../api/services/AllInfluencer";

export const useSendReminder = (applicationId: string) => {
	const queryClient = useQueryClient();
	const mutation = useMutation(async () => {
		const res = await http_sendReminderOnApplication({ applicationId });
		await queryClient.invalidateQueries(["all-influencers"]);
		return res;
	});

	return mutation;
};
