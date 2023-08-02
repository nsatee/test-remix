import { Button } from "@mantine/core";
import { cloneElement } from "react";

import { intlUnit } from "../../../utils/intlNumber";
import { SocialMediaValue } from "../influencerRowStore";

export const InfluencerSocialMediaButton = (
	props: SocialMediaValue & { icon: JSX.Element; disableParsed?: boolean }
) => {
	if (!props?.link) return null;
	return (
		<>
			<Button
				size="xs"
				variant="default"
				leftIcon={<>{cloneElement(props.icon, { size: 16 })}</>}
				component={"a"}
				href={props.link}
				target={"_blank"}
				compact
			>
				{props.disableParsed
					? props?.value
					: intlUnit(
							typeof props?.value === "string" ? +props.value : props?.value
					  )}
			</Button>
		</>
	);
};
