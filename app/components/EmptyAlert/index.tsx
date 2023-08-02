import {
	useMantineTheme,
	Stack,
	rem,
	Center,
	AspectRatio,
	Paper,
	Title,
	Text,
} from "@mantine/core";
import { isString } from "lodash";
import { cloneElement } from "react";

export const EmptyAlert = ({
	icon,
	title,
	message,
}: {
	icon: JSX.Element;
	title?: string;
	message?: React.ReactNode;
}) => {
	const theme = useMantineTheme();
	return (
		<Stack mt={rem(60)} spacing={"lg"}>
			<Center
				component={AspectRatio}
				ratio={1}
				w="100%"
				maw={rem(160)}
				mx="auto"
			>
				<Paper bg="gray.1" radius={"xl"}>
					<>
						{cloneElement(icon, {
							size: rem(100),
							color: theme.colors.gray[5],
						})}
					</>
				</Paper>
			</Center>
			<Stack ta="center" maw={rem(320)} mx="auto" spacing={"xs"}>
				{title && <Title order={4}>{title}</Title>}
				{message &&
					(isString(message) ? (
						<Text color="dimmed" size="sm">
							{message}
						</Text>
					) : (
						<>{message}</>
					))}
			</Stack>
		</Stack>
	);
};
