import "react-lazy-load-image-component/src/effects/blur.css";

import { AspectRatio, AvatarProps, MantineSize, Text } from "@mantine/core";
import { isArray, isFunction, map } from "lodash";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { getInitialName } from "../../utils/getInitialName";
import { useBoolean } from "../../utils/hooks/useBoolean";

type DynamicAvatar = AvatarProps & { blurUrl?: string; name?: string };
export const DynamicAvatar = ({
	src,
	alt,
	name,
	size = "md",
	radius,
	sx,
	blurUrl,
	...props
}: DynamicAvatar) => {
	const sizeTarget: Record<MantineSize, string> = {
		xs: "1rem",
		sm: "1.5rem",
		md: "2.3rem",
		lg: "3.5rem",
		xl: "4rem",
	};

	const [loaded, setLoaded] = useBoolean();

	return (
		<AspectRatio
			ratio={1}
			{...props}
			sx={(theme) => {
				const sxArray = isArray(sx)
					? Object.assign(
							map(sx, (t) => (isFunction(t) ? t(theme) : t || {})) || {}
					  )
					: isFunction(sx)
					? sx(theme)
					: sx;
				return {
					width: (size && sizeTarget[size as any]) || size,
					background: !src ? theme.colors.blue[1] : undefined,
					borderRadius:
						theme.radius[radius as any] || radius || theme.radius.md,
					overflow: "hidden",
					...sxArray,
				};
			}}
		>
			{!loaded && (
				<img
					src={blurUrl}
					style={{
						objectFit: "cover",
						objectPosition: "center",
						filter: "blur(10px)",
					}}
				/>
			)}
			{src ? (
				<LazyLoadImage
					src={src}
					afterLoad={setLoaded.on}
					placeholderSrc={blurUrl}
					effect="blur"
					alt={alt}
					width={"100%"}
					height="100%"
					style={{
						objectFit: "cover",
						objectPosition: "center",
						position: !loaded ? "absolute" : undefined,
					}}
					wrapperProps={{
						style: {
							width: "100%",
							height: "100%",
						},
					}}
				/>
			) : name ? (
				<Text
					sx={{
						fontSize: `calc(${sizeTarget[size as any]} - 2.5rem)`,
					}}
					color="blue"
					fw="bold"
				>
					{getInitialName(name)}
				</Text>
			) : (
				props.children
			)}
		</AspectRatio>
	);
};
