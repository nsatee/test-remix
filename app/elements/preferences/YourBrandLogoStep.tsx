import {
	ActionIcon,
	Avatar,
	Box,
	Button,
	FileButton,
	Group,
	Stack,
} from "@mantine/core";
import { IconBuildingStore, IconX } from "@tabler/icons-react";
import { filter, isEmpty, map } from "lodash";
import { useRef } from "react";

import { cloudImage } from "../../api/cloudImage";
import { usePreferencesForm } from "./preferenceFormContext";
import { useMutation } from "@tanstack/react-query";

export const YourBrandLogoStep = () => {
	const form = usePreferencesForm();
	const resetRef = useRef<() => void>(null);

	const clearFile = () => {
		form.setValues({ headshot: [] });
		resetRef.current?.();
	};
	const files = form.values.headshot;

	const handleUploadFile = useMutation(async (image: File) => {
		const uploadedFile = await cloudImage(image);

		form.setValues({
			headshot: [...(form.values.headshot || []), { url: uploadedFile.url }],
		});
	});

	return (
		<>
			<FileButton onChange={handleUploadFile.mutate} accept="image/jpeg">
				{(fileProps) => (
					<Stack align="center">
						<Group position="center">
							{isEmpty(files) ? (
								<Avatar
									size="12rem"
									sx={(theme) => ({ boxShadow: theme.shadows.md })}
								>
									<IconBuildingStore size="6rem" />
								</Avatar>
							) : (
								map(files, (file) => (
									<Box key={file.url} pos="relative">
										<Avatar
											size="12rem"
											src={file.url ? file.url : undefined}
											sx={(theme) => ({
												boxShadow: theme.shadows.md,
												borderRadius: theme.radius.md,
											})}
										>
											<IconBuildingStore size="6rem" />
										</Avatar>
										<ActionIcon
											pos="absolute"
											top="0.4rem"
											right="0.4rem"
											variant="light"
											color="red"
											onClick={() =>
												form.setValues({
													headshot: filter(
														form.values.headshot,
														({ url }) => url !== file.url
													),
												})
											}
										>
											<IconX size="1rem" />
										</ActionIcon>
									</Box>
								))
							)}
						</Group>

						<Group>
							<Button
								{...fileProps}
								variant="light"
								loading={handleUploadFile.isLoading}
							>
								Upload image
							</Button>
							<Button
								disabled={!files?.length}
								variant="light"
								color="red"
								onClick={clearFile}
							>
								Reset
							</Button>
						</Group>
					</Stack>
				)}
			</FileButton>
		</>
	);
};
