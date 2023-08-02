import { Anchor, Box, Divider, Group, SimpleGrid, Text } from "@mantine/core";
import { IconEye, IconHeart, IconMessageCircle } from "@tabler/icons-react";
import { map } from "lodash";
import { ApplicationReport } from "../../api/services/CampaignReport";
import { DynamicAvatar } from "../../components/DynamicAvatar";
import { fullname } from "../../utils/fullname";
import { intlUnit } from "../../utils/intlNumber";
import { Print } from "../../components/Print";

export const ApplicationReportApplicationList = ({
	data,
}: {
	data: ApplicationReport[];
}) => {
	const validData = data.filter((app) => app.igPost);

	return (
		<Print.Hidden>
			<Box>
				<SimpleGrid
					cols={2}
					fw="bold"
					color="dimmed"
					sx={(theme) => ({
						background: theme.colors.gray[0],
						color: theme.colors.gray[6],
					})}
				>
					<Text p="xs" size="sm">
						Name
					</Text>
					<Text p="xs" size="sm">
						Instagram stats
					</Text>
				</SimpleGrid>

				{map(validData, (application) => (
					<Box key={application.id}>
						<SimpleGrid cols={2} px="xs" pt="xs">
							<Group>
								<DynamicAvatar
									src={
										application.headshotFromCreator?.[0]?.thumbnails?.large?.url
									}
									blurUrl={
										application.headshotFromCreator?.[0]?.thumbnails?.small?.url
									}
								/>
								<Box>
									<Text lineClamp={1}>
										{fullname(
											application.firstName?.[0],
											application.lastName?.[0],
											application.id
										)}
									</Text>
									<Anchor size="xs" href={application.igPost} target="_blank">
										Visit post
									</Anchor>
								</Box>
							</Group>
							<SimpleGrid cols={3} px="xs">
								<Group spacing={"xs"}>
									<IconHeart size="1rem" />
									<Text size="sm">{intlUnit(application.igLikes)}</Text>
								</Group>
								<Group spacing={"xs"}>
									<IconMessageCircle size="1rem" />
									<Text size="sm">{intlUnit(application.igComments)}</Text>
								</Group>
								<Group spacing={"xs"}>
									<IconEye size="1rem" />
									<Text size="sm">{intlUnit(application.igViews)}</Text>
								</Group>
							</SimpleGrid>
						</SimpleGrid>
						<Divider my="xs" />
					</Box>
				))}
			</Box>
		</Print.Hidden>
	);
};
