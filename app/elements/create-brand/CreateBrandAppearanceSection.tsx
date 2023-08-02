import { Flex } from "@mantine/core";
import { useCreateBrandForm } from "./create-brand.store";
import { ImageUploader } from "../../components/ImageUploader";

export const CreateBrandAppearanceSection = () => {
	const form = useCreateBrandForm();

	return (
		<Flex gap={"lg"} align={"flex-start"}>
			<ImageUploader label="Logo" asArray {...form.getInputProps("image")} />
			<ImageUploader
				label="Banner"
				w="320px"
				ratio={16 / 9}
				asArray
				{...form.getInputProps("bannerImage")}
			/>
		</Flex>
	);
};
