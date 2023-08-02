import {
	Alert,
	Box,
	Button,
	Flex,
	Stack,
	Tabs,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { IconAlertCircle, IconArrowRight } from "@tabler/icons-react";
import { isEmpty } from "lodash";

import { InsertBrandInput } from "../../api/services/Brand";
import { CreateGroupBrandProvider } from "./create-brand.store";
import { CreateBrandAppearanceSection } from "./CreateBrandAppearanceSection";
import { CreateBrandInformationSection } from "./CreateBrandInformationSection";
import { CreateBrandSocialsSection } from "./CreateBrandSocialsSection";
import { CreateBrandTabList } from "./CreateBrandTabList";
import { useCreateBrandPageForm } from "./useCreateBrandPageForm";

export const MutationBrandForm = ({
	onSubmit,
	loading,
	submitText,
	initForm = {},
}: {
	onSubmit: (input: InsertBrandInput) => void;
	loading?: boolean;
	submitText: string;
	initForm?: Partial<InsertBrandInput & { brandId?: string }>;
}) => {
	const theme = useMantineTheme();
	const { form } = useCreateBrandPageForm({
		initValue: initForm,
	});
	return (
		<CreateGroupBrandProvider.Provider value={form}>
			<form onSubmit={form.onSubmit((input) => onSubmit(input))}>
				<Stack maw={theme.breakpoints.sm}>
					{!isEmpty(form.errors) && (
						<Alert
							icon={<IconAlertCircle size="1rem" />}
							title="Oops..."
							color="red"
						>
							It appears that some of the values in the information section you
							provided are incorrect.
						</Alert>
					)}
					<Tabs defaultValue="info" mt="lg">
						<CreateBrandTabList />
						<Tabs.Panel value="info" p="sm">
							<Stack>
								<Text size="md" fw="500">
									Appearance
								</Text>
								<CreateBrandAppearanceSection />
								<CreateBrandInformationSection />
							</Stack>
						</Tabs.Panel>
						<Tabs.Panel value="socials" p="sm">
							<CreateBrandSocialsSection />
						</Tabs.Panel>
						<Box p="sm">
							<Flex justify={"flex-end"}>
								<Button
									rightIcon={<IconArrowRight />}
									type="submit"
									loading={loading}
								>
									{submitText}
								</Button>
							</Flex>
						</Box>
					</Tabs>
				</Stack>
			</form>
		</CreateGroupBrandProvider.Provider>
	);
};
