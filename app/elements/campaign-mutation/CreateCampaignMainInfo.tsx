import {
	Accordion,
	Badge,
	Box,
	Button,
	Flex,
	Group,
	Loader,
	MultiSelect,
	NumberInput,
	Select,
	Skeleton,
	Stack,
	Switch,
	Text,
	Textarea,
	TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAfter } from "date-fns";
import { compact, isDate, isString, map } from "lodash";
import { PropsWithChildren, Suspense, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sortBy from "sort-by";

import { atb, atbQuery } from "../../api/atb";
import {
	CreateCampaignInput,
	http_createCampaign,
	InitialCampaignLocation,
} from "../../api/services/Campaign";
import { http_getNeighborhoodByMarket } from "../../api/services/CampaignMutation";
import {
	FieldChoices,
	SelectChoiceItem,
	SelectChoiceReturn,
	useAirtableSelect,
} from "../../api/services/useAirtableSelect";
import { ImageUploader } from "../../components/ImageUploader";
import { checkEmpty } from "../../utils/validateText";
import {
	CreateCampaignForm,
	useCreateCampaignForm,
} from "./useCreateCampaignForm";

const SectionTitle = (props: PropsWithChildren) => {
	return (
		<Accordion.Control>
			<Text fw="500" size="lg">
				<>{props.children}</>
			</Text>
		</Accordion.Control>
	);
};

const NeighborhoodField = ({ market }: { market?: string }) => {
	const form = useCreateCampaignForm();
	const { data } = useQuery(
		["http_getNeighborhoodByMarket", market],
		async () => {
			const res = await http_getNeighborhoodByMarket({ market });
			return res.neighborhoods;
		},
		{
			enabled: ["Atlanta, GA", "Houston, TX"].includes(market!),
		}
	);

	if (!data) return null;

	return (
		<MultiSelect
			withAsterisk
			data={
				data?.map((val) => ({
					value: val.id,
					label: val.neighborhood,
				})) || []
			}
			label="Neighborhood"
			placeholder="Pick all applied neighborhood"
			searchable
			variant="filled"
			{...form.getInputProps("neighborhood")}
		/>
	);
};

const sortField = (fields: SelectChoiceItem[] = []) => {
	return fields?.sort(sortBy("name")).map((t) => t.name) || [];
};

export type GetLocationChoiceResponse = {
	locations: Location[];
};

interface Location {
	id: string;
	title: string;
}

const http_getLocationChoices = async (input: { brandId: string }) => {
	const res = await atb.brand<GetLocationChoiceResponse>(
		atbQuery(`
	query GetLocationChoices ($brandId: [String]) {
		locations (brandId: $brandId) {
			id
			title
		}
	}
	`),
		input
	);

	return res;
};

const LocationField = () => {
	const form = useCreateCampaignForm();
	const { brandId } = useParams();
	const { data, isLoading } = useQuery(
		["locations-fields"],
		async () => {
			if (!brandId) return null;
			const res = await http_getLocationChoices({ brandId });
			return res;
		},
		{
			suspense: false,
		}
	);

	return (
		<MultiSelect
			searchable
			label="Locations"
			data={map(data?.locations, (location) => ({
				value: location.id,
				label: location.title,
			}))}
			placeholder="Select locations"
			variant="filled"
			rightSection={isLoading && <Loader size="sm" />}
			{...form.getInputProps("locations")}
		/>
	);
};

export const CreateCampaignMainDetail = ({
	fields,
}: {
	fields?: SelectChoiceReturn;
}) => {
	const form = useCreateCampaignForm();

	return (
		<Stack spacing={"xl"} sx={{ flex: 1 }}>
			<Switch
				color="green"
				checked={form.values.status === "Published"}
				onChange={() => {
					form.setValues({
						status:
							form.values.status === "Published" ? "Unlisted" : "Published",
					});
				}}
				label={
					<Group>
						<Badge
							color={form.values.status === "Published" ? "green" : "gray"}
						>
							Status: {form.values.status === "Published" ? "Publish" : "Draft"}
						</Badge>
					</Group>
				}
			/>
			<TextInput
				{...form.getInputProps("title")}
				label="Campaign title"
				variant="filled"
				withAsterisk
			/>
			<Flex gap="sm">
				<Select
					sx={{ flex: 1 }}
					label="Type"
					data={sortField(fields?.["Requirement"].choices)}
					placeholder="Select type"
					variant="filled"
					searchable
					withAsterisk
					{...form.getInputProps("requirement")}
				/>
				<Select
					sx={{ flex: 1 }}
					withAsterisk
					label="Goal"
					variant="filled"
					data={fields?.["Goal"].choices.map((t) => t.name) || []}
					{...form.getInputProps("goal")}
				/>
			</Flex>
			<Select
				label="Market"
				data={sortField(fields?.["Campaign City"].choices)}
				placeholder="Select market"
				variant="filled"
				searchable
				withAsterisk
				{...form.getInputProps("campaignCity")}
			/>
			<Suspense
				fallback={
					<Stack spacing={"0.2rem"}>
						<Skeleton h="1rem" w="30%" />
						<Skeleton h="3rem" w="100%" />
					</Stack>
				}
			>
				<NeighborhoodField market={form.values.campaignCity || undefined} />
			</Suspense>
			<Select
				label="How many influencer?"
				data={fields?.["Count"].choices.map((t) => t.name) || []}
				placeholder="Select type"
				variant="filled"
				{...form.getInputProps("count")}
				withAsterisk
			/>
			<LocationField />
		</Stack>
	);
};
export const CreateCampaignInfo = () => {
	const form = useCreateCampaignForm();
	console.log(isDate(form.values.startDate));
	return (
		<Accordion>
			<Accordion.Item value="info">
				<SectionTitle>Campaign info</SectionTitle>
				<Accordion.Panel>
					<Stack spacing={"xl"} mt="lg">
						<ImageUploader
							ratio={4 / 3}
							w="300px"
							label="Cover image"
							asArray
							{...form.getInputProps("campaignImage")}
						/>
						<Textarea
							autosize
							label="Description"
							description="What do you hope to get out of the campaign from the influencer? Provide a brief description for the campaign."
							variant="filled"
							{...form.getInputProps("description")}
						/>
						<Textarea
							autosize
							label="What the creator receives?"
							description="Provide a brief description of what the creator would receive. Highlight if there will be a trade of services and what the retail value will be. Articulate the benefits of the collaboration."
							variant="filled"
							{...form.getInputProps("whatYouRecieve")}
						/>
						<Flex gap="md">
							<DateInput
								allowDeselect
								label="Start date"
								w="100%"
								valueFormat="DD/MM/YYYY"
								minDate={new Date()}
								variant="filled"
								onDateChange={(currentDate) => {
									if (isDate(form.values.endDate)) {
										if (isAfter(currentDate, form.values.endDate)) {
											form.setValues({
												endDate: "" as any,
											});
										}
									}
								}}
								{...form.getInputProps("startDate")}
							/>
							<DateInput
								disabled={!isDate(form.values.startDate)}
								allowDeselect
								label="End date"
								w="100%"
								valueFormat="DD/MM/YYYY"
								minDate={new Date(form.values.startDate)}
								variant="filled"
								{...form.getInputProps("endDate")}
							/>
						</Flex>
					</Stack>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};

export const CreateCampaignAgeRange = () => {
	const form = useCreateCampaignForm();
	return (
		<Accordion>
			<Accordion.Item value="age">
				<SectionTitle>Age range</SectionTitle>
				<Accordion.Panel>
					<Flex gap="md" mt="lg">
						<NumberInput
							hideControls
							label="Minimum"
							w="100%"
							variant="filled"
							{...form.getInputProps("lowAge")}
						/>
						<NumberInput
							hideControls
							label="Maximum"
							w="100%"
							variant="filled"
							{...form.getInputProps("highAge")}
						/>
					</Flex>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};
export const CreateCampaignBrandInfo = () => {
	const form = useCreateCampaignForm();
	return (
		<Accordion>
			<Accordion.Item value="info">
				<SectionTitle>Campaign info</SectionTitle>
				<Accordion.Panel>
					<Stack spacing={"xl"} mt="lg">
						<Textarea
							label="Brand Story"
							description="Describe the story of the brand to give the influencer a sense of how to position the content aligned to the brand."
							variant="filled"
							{...form.getInputProps("brandStory")}
						/>
						<NumberInput
							icon={<IconCurrencyDollar size="1rem" />}
							hideControls
							label="Retail Value"
							description="What's the retail value of the product, service or experience you'll gift the influencer for the content they product."
							variant="filled"
							{...form.getInputProps("retailValue")}
						/>
					</Stack>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};
export const CreateCampaignContentGuide = () => {
	const form = useCreateCampaignForm();

	return (
		<Accordion>
			<Accordion.Item value="guide">
				<SectionTitle>Content guide</SectionTitle>
				<Accordion.Panel>
					<Stack spacing={"xl"} mt="lg">
						<Textarea
							label="Visuals & theme"
							description="Describe the overall visuals and theme for the content that you'd like to produce. The biggest distinction is if you want voice over or trending music."
							variant="filled"
							{...form.getInputProps("visualsTheme")}
						/>
						<Textarea
							label="Inspiration"
							description={`Copy and paste links to social media posts that look like the content you'd like produced. Separate link with ( , )`}
							{...form.getInputProps("inspiration")}
							variant="filled"
						/>
					</Stack>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};

export const CreateCampaignRequirement = ({
	fields,
}: {
	fields?: SelectChoiceReturn;
}) => {
	const form = useCreateCampaignForm();
	return (
		<Accordion>
			<Accordion.Item value="requirement">
				<SectionTitle>Content requirement</SectionTitle>
				<Accordion.Panel>
					<Stack spacing={"xl"} mt="lg">
						<MultiSelect
							label="Target Creator Size"
							searchable
							variant="filled"
							data={
								fields?.["Target Creator Size"].choices.map((t) => t.name) || []
							}
							description="What's the desired size of influencer you are looking to collaborate with for this specific campaign."
							{...form.getInputProps("targetCreatorSize")}
						/>
						<MultiSelect
							label="Influencer Type"
							variant="filled"
							searchable
							data={fields?.["Niche"].choices.map((t) => t.name) || []}
							description="Select the type(s) of influencers you'd like to work with for this campaign."
							{...form.getInputProps("niche")}
						/>
						<MultiSelect
							label="Influencer Type"
							variant="filled"
							searchable
							data={fields?.["Content"].choices.map((t) => t.name) || []}
							description="Select the social media platform(s) the influencers can submit content to for the campaign."
							{...form.getInputProps("content")}
						/>
						<Textarea
							label="Hashtags & Mentions"
							variant="filled"
							description="Describe if you have any requirements for the hashtags or mentions in the social media post."
							{...form.getInputProps("hashtagsMentions")}
						/>
						<Textarea
							label="Scheduling Requirements"
							variant="filled"
							description="Describe the specific windows of time that you would like the influencers to schedule within. Please be as detailed as possible!"
							{...form.getInputProps("schedulingRequirements")}
						/>
					</Stack>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};

export const CreateCampaignMainInfo = () => {
	const params = useParams();

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const createCampaign = useMutation(
		async (input: CreateCampaignInput) => {
			const res = await http_createCampaign(input);
			await queryClient.invalidateQueries(["campaign-list"]);
			return res;
		},
		{
			onSuccess: () => {
				notifications.show({
					title: "Campaign",
					message: "Create campaign successfully.",
					color: "green",
				});
				navigate("/agent/campaign-list");
			},
			onError: () => {
				notifications.show({
					title: "Campaign",
					message: "Something went wrong, please try again later.",
					color: "red",
				});
			},
		}
	);

	return (
		<CampaignMutationForm
			buttonText="Create a new campaign"
			onSubmit={createCampaign.mutate}
			loading={createCampaign.isLoading}
			initForm={{
				brand: compact([params.brandId]),
				status: "Unlisted",
			}}
		/>
	);
};
export const CampaignMutationForm = ({
	initForm,
	onSubmit,
	loading,
	buttonText,
}: {
	initForm?: Partial<CreateCampaignInput & { id?: string }>;
	onSubmit?: (input: CreateCampaignInput) => void;
	loading?: boolean;
	buttonText: string;
}) => {
	const form = useForm<CreateCampaignInput>({
		initialValues: {
			...initForm,
			locations: map(initForm?.locations, (location) => {
				if (isString(location)) return location;
				return (location as InitialCampaignLocation).id;
			}),
			campaignCity: initForm?.campaignCity,
			lowAge: initForm?.lowAge || undefined,
			highAge: initForm?.highAge || undefined,
			neighborhood: map(initForm?.neighborhood, (location) => {
				if (isString(location)) return location;
				return (location as InitialCampaignLocation).id;
			}),
			startDate: initForm?.startDate
				? (new Date(initForm.startDate) as any)
				: undefined,
			endDate: initForm?.endDate
				? (new Date(initForm.endDate) as any)
				: undefined,
			brandStory: initForm?.brandStory || undefined,
			retailValue: initForm?.retailValue || undefined,
		} as CreateCampaignInput,
		validate: {
			title: (val) => checkEmpty(val, "Required"),
			requirement: (val) => checkEmpty(val, "Required"),
			campaignCity: (val) => checkEmpty(val, "Required"),
			count: (val) => checkEmpty(val, "Required"),
			status: (val) => checkEmpty(val, "Required"),
			goal: (val) => checkEmpty(val, "Required"),
		},
	});

	const { selectTable, isLoading } = useAirtableSelect();
	const fieldChoices = useMemo(() => {
		if (!isLoading) {
			return selectTable({ tableId: FieldChoices.CREATE_CAMPAIGN });
		}
	}, [selectTable, isLoading]);

	return (
		<CreateCampaignForm.Provider value={form}>
			<form onSubmit={form.onSubmit((e) => onSubmit?.(e))}>
				<Stack>
					<CreateCampaignMainDetail fields={fieldChoices} />
					<Box
						sx={(theme) => ({
							borderTop: `1px solid ${theme.colors.gray[3]}`,
						})}
					>
						<CreateCampaignInfo />
						<CreateCampaignAgeRange />
						<CreateCampaignBrandInfo />
						<CreateCampaignContentGuide />
						<CreateCampaignRequirement fields={fieldChoices} />
					</Box>
					<Flex justify={"flex-end"}>
						<Button loading={loading} type="submit">
							{buttonText}
						</Button>
					</Flex>
				</Stack>
			</form>
		</CreateCampaignForm.Provider>
	);
};
