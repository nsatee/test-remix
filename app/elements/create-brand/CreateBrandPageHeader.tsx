import { Text, Title } from "@mantine/core";
import { MailLink } from "../../components/MailLink";

export const CreateBrandPageHeader = () => {
	return (
		<div>
			<Title>Add a brand</Title>
			<Text>
				Share information about your brand and we'll help you create your first
				campaign to attract influencers. The brand creation process is in Beta.
				Reach out to <MailLink>michael@wiseassistant.com</MailLink> for help!
			</Text>
		</div>
	);
};
