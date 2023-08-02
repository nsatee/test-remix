import { Badge, Group, Input, Text } from "@mantine/core";
import InputMask from "react-input-mask";
import { usePreferencesForm } from "./preferenceFormContext";

export const ContactNumberStep = () => {
	const form = usePreferencesForm();
	return (
		<Input.Wrapper
			label={
				<Group>
					<Text>Phone number</Text>
					<Badge size="sm">Not required</Badge>
				</Group>
			}
			size="md"
		>
			<Input
				component={InputMask}
				mask="(999) 999-9999"
				size="xl"
				variant="unstyled"
				placeholder="(123) 456-7890"
				sx={(theme) => ({
					borderBottom: `1px solid ${theme.colors.gray[3]}`,
				})}
				{...form.getInputProps("phoneNumber")}
			/>
			<Input.Description mt="xs" size="sm">
				We'll only use your phone number to text you about last-minute
				collaboration opportunities or scheduling updates.
			</Input.Description>
		</Input.Wrapper>
	);
};
