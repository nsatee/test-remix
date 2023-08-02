import { UseFormReturnType } from "@mantine/form";
import { map } from "lodash";
import isEmpty from "lodash/isEmpty";

export const usernameInputProps = <T = any,>(
	form: UseFormReturnType<T>,
	name: keyof T
) => {
	return {
		...form.getInputProps(name),
		onKeyUp: (e: any) => {
			const textValue = e.currentTarget.value;
			if (!isEmpty(textValue)) {
				const snakeCase = map(textValue, (char) =>
					char === " " ? "_" : char
				).join("");
				form.setValues({
					[name]: snakeCase,
				} as T);
				e.currentTarget.value = snakeCase;
			}
		},
	};
};
