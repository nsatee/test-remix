import { Group, Tabs } from "@mantine/core";

export const CreateBrandTabList = () => (
	<Group position="apart">
		<Tabs.List>
			<Tabs.Tab value="info" fz="lg" fw="500">
				Information
			</Tabs.Tab>

			<Tabs.Tab value="socials" fz="lg" fw="500">
				Socials
			</Tabs.Tab>
		</Tabs.List>
	</Group>
);
