import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import {
	GetInstagramPostResponse,
	http_updateApplicationStats,
} from "../../api/services/CampaignReport";
import { Slot } from "../../components/Slot";

export const RegenerateReportButton = ({
	data,
	children,
}: PropsWithChildren<{ data: { url: string; id: string }[] }>) => {
	const queryClient = useQueryClient();
	const params = useParams();
	const mutation = useMutation(async () => {
		const result: GetInstagramPostResponse[] = [];
		for (const input of data) {
			try {
				const res = await http_updateApplicationStats(input);
				res?.data && result.push(res.data);
			} catch (err) {
				const res = await http_updateApplicationStats(input);
				res?.data && result.push(res.data);
			}
		}
		await queryClient.invalidateQueries(["campaign-report", params.campaignId]);
		notifications.show({
			title: "Generate campaign report",
			message: "The report is generated!",
			color: "green",
		});
		return result;
	});

	return (
		<Slot onClick={mutation.mutate} loading={mutation.isLoading}>
			{children}
		</Slot>
	);
};
