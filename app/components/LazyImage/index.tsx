import { createStyles, ImageProps } from "@mantine/core";
import {
	LazyLoadImage,
	LazyLoadImageProps,
} from "react-lazy-load-image-component";
import { useBoolean } from "../../utils/hooks/useBoolean";

const useLazyImageStyle = createStyles(() => ({
	root: {
		objectFit: "cover",
		objectPosition: "center",
		width: "100%",
		height: "100%",
	},
	wrapper: {
		width: "100%",
		height: "100%",
	},
}));

export const LazyImage = ({ ...props }: ImageProps & LazyLoadImageProps) => {
	const { classes } = useLazyImageStyle();
	const [loaded, setLoaded] = useBoolean();
	if (!props.src) return null;

	return (
		<>
			{!loaded && props.placeholderSrc && (
				<img
					src={props.placeholderSrc}
					className={classes.root}
					style={{
						filter: "blur(10px)",
						transform: "scale(1.2)",
					}}
				/>
			)}
			<LazyLoadImage
				effect="blur"
				afterLoad={setLoaded.on}
				className={classes.root}
				wrapperClassName={classes.wrapper}
				style={{
					position: loaded ? "relative" : "absolute",
				}}
				{...props}
			/>
		</>
	);
};
