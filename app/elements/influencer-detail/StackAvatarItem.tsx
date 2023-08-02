import { Avatar, AvatarProps } from "@mantine/core";

export const StackAvatarItem = ({
	isMainImage,
	...props
}: AvatarProps & { isMainImage?: boolean }) => {
	if (!props.src) return null;
	return (
		<Avatar
			pos="absolute"
			size={"12rem"}
			radius={"lg"}
			top={0}
			{...props}
			src={isMainImage ? props.src : undefined}
		/>
	);
};
