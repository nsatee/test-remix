import {
	AspectRatio,
	Avatar,
	Box,
	FileButton,
	Flex,
	LoadingOverlay,
	Text,
	UnstyledButton,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPhoto } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { cloudImage } from "../../api/cloudImage";

export type ImageUploaderProps = {
	label: string;
	ratio?: number;
	w?: any;
	h?: any;
	disableResize?: boolean;
} & (
	| {
			asArray?: false;
			onChange: (result: { url: string }) => void;
			value?: { url: string };
	  }
	| {
			asArray: true;
			onChange: (result: [{ url: string }]) => void;
			value?: { url: string }[];
	  }
);

export const ImageUploader = (props: ImageUploaderProps) => {
	const [defaultImage, setDefaultImage] = useState(
		props.asArray ? props.value?.[0] : props.value
	);
	const upload = useMutation(
		async (image: File) => {
			const res = await cloudImage(image, {
				disableResize: props.disableResize,
			});
			const result = { url: res.url };
			setDefaultImage(result);
			return result;
		},
		{
			onSuccess: (result) => {
				props.asArray ? props.onChange([result]) : props.onChange(result);
			},
			onError: () => {
				notifications.show({
					title: "Upload image",
					message: "Cannot upload image at the moment, please try again later.",
					color: "red",
				});
			},
		}
	);
	return (
		<FileButton onChange={upload.mutateAsync} accept="image/png,image/jpeg">
			{(inputProps) => (
				<Box pos="relative">
					<UnstyledButton {...inputProps}>
						<Box w="100%" h="100%">
							{props.label && (
								<Text size="sm" fw="500" mb="xs" opacity={0.6}>
									{props.label}
								</Text>
							)}
							<AspectRatio
								w={props.w || "120px"}
								ratio={props.ratio || 1}
								h={props.h}
								sx={(theme) => ({
									boxShadow: theme.shadows.md,
									borderRadius: theme.radius.md,
									overflow: "hidden",
								})}
							>
								<Avatar w="100%" h="100%" src={defaultImage?.url}>
									<Flex direction={"column"} align={"center"}>
										<IconPhoto size="4rem" />
									</Flex>
								</Avatar>
								<LoadingOverlay
									overlayBlur={"5px"}
									visible={upload.isLoading}
								/>
							</AspectRatio>
						</Box>
					</UnstyledButton>
				</Box>
			)}
		</FileButton>
	);
};
