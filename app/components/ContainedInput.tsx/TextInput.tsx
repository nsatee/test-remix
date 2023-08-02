import { TextInput, TextInputProps } from "@mantine/core";

import { useContainInputStyles } from "./useContainInputStyles";

export const ContainedInputText = ({ className, ...props }: TextInputProps) => {
	const { classes } = useContainInputStyles();

	return <TextInput classNames={classes} {...props} />;
};
