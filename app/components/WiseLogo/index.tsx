import wiseLogoUrl from "../../assets/logo.png";
import { Box, Image, createStyles, rem } from "@mantine/core";

const useStyles = createStyles(() => ({
	root: {},
	container: {
		aspectRatio: "1",
		width: rem(32),
	},
}));

export const WiseLogo = () => {
	const { classes } = useStyles();
	return (
		<Box className={classes.container}>
			<Image src={wiseLogoUrl} alt="Wise Assistant" className={classes.root} />
		</Box>
	);
};
