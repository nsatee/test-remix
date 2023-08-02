import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http_acceptApplication } from "../../api/services/AllInfluencer";

export const useApplicationAction = (
	applicationId: string,
	status: "Scheduling" | "Passed"
) => {
	const queryClient = useQueryClient();
	const approveApplication = useMutation(async () => {
		const res = await http_acceptApplication({
			applicationId,
			status,
		});
		await queryClient.invalidateQueries(["all-influencers"]);
		return res;
	});

	return approveApplication;
};
