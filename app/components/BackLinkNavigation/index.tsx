import { Anchor, AnchorProps, Flex, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { createComponent } from "../../utils/createComponent";

export const BackLinkNavigation = createComponent<
	"a",
	HTMLAnchorElement,
	AnchorProps
>((props, ref) => {
	return (
		<Anchor {...props} ref={ref} size="sm">
			<Flex align="center" gap="xs">
				<IconArrowLeft size="1rem" />
				<Text span>{props.children}</Text>
			</Flex>
		</Anchor>
	);
});
