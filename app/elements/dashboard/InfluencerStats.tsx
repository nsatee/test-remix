import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { compact } from "lodash";

import { StatusEnum } from "../../api/common.type";
import { http_getBrandApplicationStats } from "../../api/services/Dashboard";
import { StatsSegments } from "../../components/StatsSegments";
import { useMe } from "../../stores/Me.store";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { Link } from "react-router-dom";

export const InfluencerStats = () => {
	const [me] = useMe();
	const { data } = useQuery(["total-application"], async () => {
		return http_getBrandApplicationStats({ email: me?.user.email_address });
	});
	if (!data) return null;
	const total = data?.length || 0;
	const completedCreator =
		compact(data?.map((t) => t.status === "Posted")).length || 0;
	const inProgressCreator =
		compact(
			compact(
				data?.map((t) =>
					(["Scheduling", "Confirmed", "Completed"] as StatusEnum[]).includes(
						t.status
					)
				)
			)
		).length || 0;
	const approvedCreator =
		compact(
			compact(
				data?.map((t) =>
					(
						["Scheduling", "Confirmed", "Completed", "Posted"] as StatusEnum[]
					).includes(t.status)
				)
			)
		).length || 0;

	return (
		<StatsSegments
			total={total?.toString()}
			totalDescription="Total influencer's application"
			trailingElement={
				<Button
					variant="outline"
					size="sm"
					rightIcon={<IconArrowRight />}
					component={Link}
					to={`/agent/all-influencers`}
				>
					See all influencers
				</Button>
			}
			data={[
				{
					label: "Approved",
					count: approvedCreator.toString(),
					part: calculatePercentage(approvedCreator, data.length),
					color: "teal",
				},
				{
					label: "In progress",
					count: inProgressCreator.toString(),
					part: calculatePercentage(inProgressCreator, total),
					color: "pink",
				},
				{
					label: "Completed",
					count: completedCreator.toString(),
					part: calculatePercentage(completedCreator, total),
					color: "indigo",
				},
				{
					label: "Other",
					count: (
						total -
						(completedCreator + inProgressCreator + approvedCreator)
					).toString(),
					part: calculatePercentage(
						total - (completedCreator + inProgressCreator + approvedCreator),
						data.length
					),
					color: "gray",
				},
			]}
		/>
	);
};
