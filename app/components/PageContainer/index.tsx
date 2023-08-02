import { Container, ContainerProps, useMantineTheme } from "@mantine/core";

export const PageContainer = (props: ContainerProps) => {
	const theme = useMantineTheme();

	return (
		<Container
			pb="xl"
			pt="lg"
			maw={theme.breakpoints.xl}
			{...props}
			style={{
				minHeight: "70dvh",
				...props.style,
			}}
			sx={{
				...props.sx,
			}}
		/>
	);
};
