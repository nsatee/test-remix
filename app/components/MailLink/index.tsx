import { Anchor } from "@mantine/core";

export const MailLink = ({ children }: { children: string }) => {
	return <Anchor href={`mailto:${children}`}>{children}</Anchor>;
};
