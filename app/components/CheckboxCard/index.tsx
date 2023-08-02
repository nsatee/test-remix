import { Box, createStyles, Radio, RadioProps, rem, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	button: {
		display: "flex",
		width: "100%",
		border: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
		}`,
		cursor: "pointer",
		borderRadius: theme.radius.md,
		padding: theme.spacing.md,
		paddingLeft: `calc(${theme.spacing.xl} * 2)`,
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[9]
					: theme.colors.gray[0],
		},
	},
}));

export function CheckboxCard({
	title,
	description,
	value,
	...others
}: RadioProps) {
	const { classes, cx } = useStyles();

	return (
		<Radio
			{...others}
			value={title}
			sx={(theme) => ({
				".mantine-Radio-body": {
					width: "100%",
					position: "relative",
				},
				".mantine-Radio-inner": {
					position: "absolute",
					padding: theme.spacing.md,
				},
				".mantine-Radio-label": {
					width: "100%",
					padding: 0,
				},
				".mantine-Radio-labelWrapper": {
					flex: 1,
				},
				".mantine-Radio-radio": {
					cursor: "pointer",
				},
			})}
			label={
				<Box className={cx(classes.button)}>
					<div>
						<Text fw={500} mb={7} sx={{ lineHeight: 1 }}>
							{title}
						</Text>
						<Text fz="sm" c="dimmed">
							{description}
						</Text>
					</div>
				</Box>
			}
		/>
	);
}
