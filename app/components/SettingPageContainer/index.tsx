import { Stack, StackProps, createStyles } from "@mantine/core";
import { PageContainer } from "../PageContainer";

export const useStyles = createStyles((theme) => ({
	root: {
		maxWidth: theme.breakpoints.xs,
		width: "100%",
	},
}));

export const SettingPage = (props: StackProps) => {
	const { classes, cx } = useStyles();
	return (
		<PageContainer>
			<Stack
				spacing={"xl"}
				{...props}
				className={cx(classes.root, props.className)}
			/>
		</PageContainer>
	);
};
