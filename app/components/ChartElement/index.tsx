import { useMantineTheme } from "@mantine/core";
import Chart from "react-apexcharts";

export type ChartElementProps = {
	series: {
		name: string;
		data: number[];
	}[];
	categories: (string | Date)[];
};

export const ChartElement = (props: ChartElementProps) => {
	const theme = useMantineTheme();
	const renderData = (opts: ChartElementProps) => ({
		series: opts.series,
		options: {
			chart: {
				height: 350,
				type: "area",
				toolbar: {
					show: true,
					tools: {
						download: false,
						selection: true,
						zoom: true,
					},
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				width: 1.5,
				colors: [theme.colors.blue[5], theme.colors.green[5]],
			},
			grid: {
				show: true,
				borderColor: "#f2f3f5",
				strokeDashArray: 0,
				position: "back",
				xaxis: {
					lines: {
						show: false,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
				},
				row: {
					colors: [],
					opacity: 0.5,
				},
				column: {
					colors: [],
					opacity: 0.5,
				},
				padding: {
					top: 0,
					right: 0,
					bottom: 12,
					left: 12,
				},
			},
			xaxis: {
				type: "datetime",
				categories: opts.categories,
			},
			tooltip: {
				x: {
					format: "ddd dd MMM, yyyy",
				},
			},
		} as ApexCharts.ApexOptions,
	});
	return (
		<Chart
			options={renderData(props).options}
			series={renderData(props).series}
			type="area"
			height={350}
		/>
	);
};
