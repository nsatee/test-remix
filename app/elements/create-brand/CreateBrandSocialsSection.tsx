import { Stack, TextInput } from "@mantine/core";
import { useCreateBrandForm } from "./create-brand.store";

export const CreateBrandSocialsSection = () => {
	const form = useCreateBrandForm();
	return (
		<Stack spacing={"lg"}>
			<TextInput label="Website link" {...form.getInputProps("websiteLink")} />
			<TextInput
				label="Instagram link"
				{...form.getInputProps("instagramLink")}
			/>
			<TextInput label="Tiktok link" {...form.getInputProps("tikTokLink")} />
			<TextInput label="Youtube link" {...form.getInputProps("youTubeLink")} />
			<TextInput label="Twitter link" {...form.getInputProps("twitterLink")} />
			<TextInput
				label="Facebook link"
				{...form.getInputProps("facebookLink")}
			/>
		</Stack>
	);
};
