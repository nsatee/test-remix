import { Flex, Modal, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { map } from "lodash";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { http_getBrandByEmail } from "../../api/services/Brand";
import { Slot } from "../../components/Slot";
import { useMe } from "../../stores/Me.store";

export const CreateCampaignTrigger = (props: PropsWithChildren) => {
	const [opened, { open, close }] = useDisclosure();
	const [me] = useMe();
	const { data } = useQuery(["my-brand"], async () => {
		if (!me) return null;
		const res = await http_getBrandByEmail({ email: me.user.email_address });
		return res;
	});

	return (
		<>
			<Slot onClick={open}>{props.children}</Slot>
			<Modal opened={opened} onClose={close} title="Brands for campaign">
				<Flex direction={"column"}>
					{map(data, (brand) => (
						<UnstyledButton
							key={brand.id}
							component={Link}
							to={`/agent/create-campaign/${brand.id}`}
							onClick={close}
							sx={(theme) => ({
								width: "100%",
								padding: theme.spacing.md,
								borderBottom: `1px solid ${theme.colors.gray[3]}`,
								"&:hover": {
									background: theme.colors.gray[0],
								},
							})}
						>
							{brand.name}
						</UnstyledButton>
					))}
				</Flex>
			</Modal>
		</>
	);
};
