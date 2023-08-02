import {
	Box,
	Button,
	Collapse,
	Group,
	Paper,
	Stack,
	Stepper,
	Text,
	Title,
	UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSelector } from "@tabler/icons-react";
import { isEmpty } from "lodash";
import { useSearchParams } from "react-router-dom";

import { Membership } from "../../api/services/SearchInfluencer";
import { SetupPreferenceInputType } from "../../api/services/SetupPreferences";
import { PageContainer } from "../../components/PageContainer";
import { useMe } from "../../stores/Me.store";
import { useStepper } from "../../utils/hooks/useStepper";
import { onlyNumber } from "../../utils/onlyNumber";
import { ContactNumberStep } from "./ContactNumberStep";
import { FormContext, PreferenceImages } from "./preferenceFormContext";
import { SocialAccountStep } from "./SocialAccountStep";
import { usePreferencesPageStyle } from "./usePreferencesPageStyle";
import { WhoAreYouStep } from "./WhoAreYouStep";
import { YourBrandLogoStep } from "./YourBrandLogoStep";

const PREF_STEP_KEY = "step";

const steps = [
	{
		key: "who",
		title: "Who are you?",
		description: "Define your main focus for your platform experiences.",
		content: <WhoAreYouStep />,
	} as const,
	{
		key: "brand",
		title: "Your brand logo",
		description: "Everyone will see this image as your brand logo.",
		content: <YourBrandLogoStep />,
	} as const,
	{
		key: "socials",
		title: "Social Accounts",
		description: "Make it easier for influencer to check out your brand.",
		content: <SocialAccountStep />,
	} as const,
	{
		key: "phone",
		title: "Contact number",
		description: "General contact info in case influencer have any question.",
		content: <ContactNumberStep />,
	} as const,
];

export const useDisableStepper = <T extends unknown>(data: T[]) => {
	return data;
};

const social = {
	instagramHandle: "https://instagram.com/",
	tikTokHandle: "https://tiktok.com/@",
	youTubeHandle: "https://youtube.com/@",
	facebookHandle: "https://facebook.com/",
	twitterHandle: "https://twitter.com/",
};

export const PreferenceContent = (props: {
	initialData?: SetupPreferenceInputType;
	onSubmit?: (value: SetupPreferenceInputType) => void;
	isLoading?: boolean;
	hidden?: typeof steps[number]["key"][];
}) => {
	const [me] = useMe();
	const { classes } = usePreferencesPageStyle();
	const [params, setParams] = useSearchParams();
	const [navigationOpen, setNavigationOpen] = useDisclosure();

	const handleParseValue = (values: SetupPreferenceInputType) => {
		const parseSocial = (name: keyof typeof social, value?: string) => {
			return { [name]: value ? `${social[name]}${value}` : "" };
		};

		return {
			...values,
			...parseSocial("facebookHandle", values.facebookHandle),
			...parseSocial("instagramHandle", values.instagramHandle),
			...parseSocial("tikTokHandle", values.tikTokHandle),
			...parseSocial("youTubeHandle", values.youTubeHandle),
			...parseSocial("twitterHandle", values.twitterHandle),
		} as SetupPreferenceInputType;
	};
	const handleParseInitValue = (values: SetupPreferenceInputType) => {
		const parseSocial = (name: keyof typeof social, value?: string) => {
			return { [name]: value ? value.replace(social[name], "") : "" };
		};

		return {
			...values,
			...parseSocial("facebookHandle", values?.facebookHandle),
			...parseSocial("instagramHandle", values?.instagramHandle),
			...parseSocial("tikTokHandle", values?.tikTokHandle),
			...parseSocial("youTubeHandle", values?.youTubeHandle),
			...parseSocial("twitterHandle", values?.twitterHandle),
		} as SetupPreferenceInputType;
	};

	const form = useForm<SetupPreferenceInputType>({
		initialValues: {
			status: "Complete",
			membership: Membership.VerifiedMember,
			emailAddress: me?.user.email_address,
			firstName: me?.profile.first_name,
			lastName: me?.profile.last_name,
			name: me?.profile.username,
			account: true,
			onboarded: true,
			...(handleParseInitValue(
				props.initialData as SetupPreferenceInputType
			) as any),
		} as SetupPreferenceInputType,
	});

	const [activeStep, handlers] = useStepper(
		onlyNumber(params.get(PREF_STEP_KEY)),
		{
			data: steps,
			onChange: (page) => {
				params.set(PREF_STEP_KEY, page.toString());
				setParams(params);
				setNavigationOpen.close();
			},
			disableAt: {
				who: isEmpty(form.values.type),
			},
			hidden: props.hidden,
		}
	);

	return (
		<PreferenceImages
			initValue={{
				value: props.initialData?.headshot?.map((t) => t.url) || [],
			}}
		>
			<FormContext.Provider value={form}>
				<PageContainer>
					<Stack spacing={"sm"}>
						<Title>Your preferences</Title>
						<Paper className={classes.header}>
							<Group
								position="apart"
								noWrap
								sx={(theme) => ({
									[theme.fn.smallerThan("md")]: {
										flexDirection: "column",
									},
								})}
							>
								<UnstyledButton
									onClick={setNavigationOpen.toggle}
									className={classes.plainBtn}
								>
									<Group
										sx={(theme) => ({
											[theme.fn.smallerThan("md")]: {
												justifyContent: "space-between",
											},
										})}
									>
										<Box
											sx={(theme) => ({
												[theme.fn.smallerThan("md")]: {
													order: 2,
												},
											})}
										>
											<IconSelector />
										</Box>
										<Box
											sx={(theme) => ({
												[theme.fn.smallerThan("md")]: {
													order: 1,
												},
											})}
										>
											<Text color="dimmed" size="xs">
												<>
													{handlers.step === handlers.totalStep
														? "Final step"
														: `	Step ${handlers.step}/${handlers.totalStep}`}
												</>
											</Text>
											<Text size="xl" fw="600">
												{activeStep.title}
											</Text>
										</Box>
									</Group>
								</UnstyledButton>
								<Group p="sm">
									<Button
										variant="default"
										onClick={handlers.decrement}
										disabled={!handlers.canDecrease}
									>
										Back
									</Button>
									{handlers.canIncrease ? (
										<Button
											onClick={handlers.increment}
											disabled={handlers.onHold}
										>
											Next step
										</Button>
									) : (
										<Button
											onClick={() =>
												props.onSubmit?.(handleParseValue(form.values))
											}
											loading={props.isLoading}
										>
											Save preferences
										</Button>
									)}
								</Group>
							</Group>
							<Collapse in={navigationOpen} px="md">
								<Stepper
									active={handlers.active}
									onStepClick={handlers.setStep}
									orientation="vertical"
									allowNextStepsSelect={true}
									pt="lg"
								>
									{handlers.resultData.map((step) => (
										<Stepper.Step
											key={step.title}
											label={step.title}
											description={step.description}
											w="100%"
										/>
									))}
								</Stepper>
							</Collapse>
						</Paper>
						<Paper px="sm" mt="lg">
							{activeStep.content}
						</Paper>
					</Stack>
				</PageContainer>
			</FormContext.Provider>
		</PreferenceImages>
	);
};

export default PreferenceContent;
