import { rem, SegmentedControl, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { compact } from "lodash";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { http_getLatestPostByInfluencerName } from "../../api/services/InfluencerDetail";
import { LatestCollabInstagram } from "./LatestCollabInstagram";
import { LatestCollabTiktok } from "./LatestCollabTiktok";

export const LatestCollabSection = ({
	creatorName,
}: {
	creatorName: string;
}) => {
	const { uid } = useParams();
	const [activeSection, setActiveSection] = useState<string>("instagram");
	const { data = [] } = useQuery(
		[http_getLatestPostByInfluencerName, creatorName, uid],
		async () => {
			if (!uid) return [];
			const res = await http_getLatestPostByInfluencerName({
				creatorId: [uid],
				creatorName,
			});
			return res || [];
		},
		{
			enabled: Boolean(uid),
		}
	);
	return (
		<Stack style={{ flex: 1 }} mt="xl">
			<Text fz="xl" fw="600" ta="center">
				Latest collabs
			</Text>
			<SegmentedControl
				w={rem(320)}
				style={{
					alignSelf: "center",
				}}
				onChange={setActiveSection}
				data={[
					{
						label: "Instagram",
						value: "instagram",
					},
					{
						label: "Tiktok",
						value: "tiktok",
					},
				]}
			/>
			{activeSection === "instagram" && (
				<LatestCollabInstagram
					data={compact(data.map((application) => application.igPost))}
				/>
			)}
			{activeSection === "tiktok" && (
				<LatestCollabTiktok
					data={compact(data.map((application) => application.tikTokPost))}
				/>
			)}
		</Stack>
	);
};
