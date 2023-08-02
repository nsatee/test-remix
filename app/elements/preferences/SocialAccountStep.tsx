import { Stack } from "@mantine/core";
import {
	IconBrandFacebook,
	IconBrandInstagram,
	IconBrandTiktok,
	IconBrandTwitter,
	IconBrandYoutube,
} from "@tabler/icons-react";

import { usePreferencesPageStyle } from "./usePreferencesPageStyle.tsx";
import { usePreferencesForm } from "./preferenceFormContext.tsx";
import { ContainedInputText } from "../../components/ContainedInput.tsx/TextInput.tsx";

export const SocialAccountStep = () => {
	const { classes } = usePreferencesPageStyle();
	const form = usePreferencesForm();
	return (
		<Stack className={classes.socialRightIcon}>
			<ContainedInputText
				rightSection={<IconBrandInstagram />}
				label="instagram.com/"
				placeholder="Instagram handle"
				{...form.getInputProps("instagramHandle")}
			/>
			<ContainedInputText
				rightSection={<IconBrandTiktok />}
				label="tiktok.com/@"
				placeholder="TikTok handle"
				{...form.getInputProps("tikTokHandle")}
			/>
			<ContainedInputText
				rightSection={<IconBrandYoutube />}
				label="youtube.com/@"
				placeholder="YouTube handle"
				{...form.getInputProps("youTubeHandle")}
			/>
			<ContainedInputText
				rightSection={<IconBrandTwitter />}
				label="twitter.com/"
				placeholder="Twitter handle"
				{...form.getInputProps("twitterHandle")}
			/>
			<ContainedInputText
				rightSection={<IconBrandFacebook />}
				label="facebook.com/"
				placeholder="Facebook handle"
				{...form.getInputProps("facebookHandle")}
			/>
		</Stack>
	);
};
