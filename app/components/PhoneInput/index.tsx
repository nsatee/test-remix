import { Input, TextInputProps } from "@mantine/core";
import InputMask from "react-input-mask";
import { createComponent } from "../../utils/createComponent";

export type PhoneInputProps = TextInputProps;

export const PhoneInput = createComponent<
	"a",
	HTMLInputElement,
	PhoneInputProps
>((props, ref) => {
	return (
		<Input.Wrapper size="md" {...props} ref={ref}>
			<Input
				value={props.value}
				component={InputMask}
				mask="(999) 999-9999"
				placeholder="(123) 456-7890"
				size={props.size || "md"}
				variant={props.variant}
				color={props.color}
				radius={"md"}
				onChange={props.onChange}
				onBlur={props.onBlur}
				error={props.error}
			/>
		</Input.Wrapper>
	);
});
