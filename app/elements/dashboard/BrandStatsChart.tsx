import { Group, Paper, Select, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { format, sub } from "date-fns";
import { forEach, groupBy, map, sortBy, sum } from "lodash";

import { AIRTABLE_DATE_FORMAT } from "../../api/common.type";
import {
	BrandChartApplication,
	http_getBrandChartData,
} from "../../api/services/Dashboard";
import { ChartElement } from "../../components/ChartElement";
import { useMe } from "../../stores/Me.store";
import { useState } from "react";

const CHART_DURATION_CHOICES = [
	{ value: "14", label: "Last 14 days" },
	{ value: "30", label: "Last 30 days" },
	{ value: "60", label: "Last 60 days" },
	{ value: "90", label: "Last 90 days" },
];

const parseData = (data: BrandChartApplication[]) => {
	const record = new Map();
	const dateGroup = groupBy(sortBy(data, "createdInSecond"), "createdInSecond");

	forEach(dateGroup, (value, key) => {
		const engagement = sum(
			map(value, (targetValue) => +targetValue.igEngagement)
		);
		const impressions = sum(
			map(value, (targetValue) =>
				targetValue.igViews ? +targetValue.igViews : 0
			)
		);
		record.set(key, { engagement, impressions });
	});

	return Object.fromEntries(record) as Record<
		string,
		{ engagement: number; impressions: number }
	>;
};

const getDaysArray = function (start: Date, end: Date, plus: number = 1) {
	for (
		var arr = [], dt = new Date(start);
		dt <= new Date(end);
		dt.setDate(dt.getDate() + plus)
	) {
		arr.push(new Date(dt));
	}
	return arr;
};

export const BrandStatsChart = () => {
	const [me] = useMe();
	const [duration, setDuration] = useState(CHART_DURATION_CHOICES[1].value);
	const { data } = useQuery(
		["brand-state-charts", duration],
		async () => {
			if (me) {
				const res = await http_getBrandChartData({
					email: me?.user.email_address,
					duration: +duration,
				});
				const today = new Date();
				const values = parseData(res);
				const dateRange = getDaysArray(
					sub(today, {
						days: +duration,
					}),
					today
				).map((d) => d.toISOString());
				return { values, dateRange };
			}
			return null;
		},
		{
			enabled: Boolean(me?.user.email_address),
		}
	);
	if (!data) return null;

	const graphEngagement = data.dateRange.map((date) => {
		const parseDate = format(new Date(date), AIRTABLE_DATE_FORMAT);
		return +data.values[parseDate]?.engagement.toFixed(2) || 0;
	});
	const graphImpression = data.dateRange.map((date) => {
		const parseDate = format(new Date(date), AIRTABLE_DATE_FORMAT);
		return +data.values[parseDate]?.impressions.toFixed(2) || 0;
	});

	return (
		<Paper py="md">
			<Group mb="lg" position="apart">
				<Title order={2}>Performance</Title>
				<Select
					onChange={(e) => e && setDuration(e)}
					value={duration}
					size="sm"
					placeholder="Pick one"
					data={CHART_DURATION_CHOICES}
				/>
			</Group>

			<ChartElement
				categories={data?.dateRange || []}
				series={[
					{
						name: "Engagement (%)",
						data: graphEngagement,
					},
					{
						name: "Impression",
						data: graphImpression,
					},
				]}
			/>
		</Paper>
	);
};
