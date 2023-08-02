import {
	Box,
	BoxProps,
	createPolymorphicComponent,
	createStyles,
} from "@mantine/core";
import { forwardRef } from "react";

const useStyles = createStyles(() => ({
	image: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
		objectPosition: "center",
	},
}));

type BasicImageProps = BoxProps & { src?: string | null; alt?: string };
const _BasicImage = forwardRef<HTMLDivElement, BasicImageProps>(
	({ src, alt = "", children, ...props }, ref) => {
		const { classes } = useStyles();
		return (
			<Box {...props} sx={{}} ref={ref}>
				{src && <img src={src} alt={alt} className={classes.image} />}
			</Box>
		);
	}
);

export const BasicImage = createPolymorphicComponent<"div", BasicImageProps>(
	_BasicImage
);
