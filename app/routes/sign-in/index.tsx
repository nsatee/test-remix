import {
	Alert,
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { ActionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { IconMail } from "@tabler/icons-react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { useState } from "react";
import { http } from "~/api/http";
import { SessionResponseType, SignInInputType } from "~/api/services/User";

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();
	const body = Object.fromEntries(formData) as SignInInputType;

	const res = await http.post<SessionResponseType>("/rest-auth/login/", {
		...body,
		email: body.email.toLowerCase().trim(),
	});

	return res;
}

const initRememberMe = {
	active: false,
	value: "",
};

export default function Index() {
	const [searchParams] = useSearchParams();
	// const [rememberMe, setRememberMe] = useStorageState(
	// 	"rememberEmail",
	// 	initRememberMe
	// );
	const [initForm] = useState<SignInInputType>({
		email: "",
		password: "",
	});

	const form = useForm({
		initialValues: initForm,
		validate: {
			email: (val) => !isEmail(val) && "Email is invalid",
			password: (val) => isEmpty(val) && "Required",
		},
	});

	const justRegistered = searchParams.get("status");
	const redirectedFrom = searchParams.get("from");

	const actionData = useActionData<typeof action>();
	console.log(actionData);

	return (
		<Container size={420} my={40}>
			<Title align="center">Welcome back!</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{" "}
				<Anchor size="sm" component={Link} to="/register">
					Create account
				</Anchor>
			</Text>
			{justRegistered && (
				<Alert
					mt="md"
					icon={<IconMail size="1rem" />}
					title={<Text>Account Creation Successful! 🎉</Text>}
					color="green"
				>
					Woohoo! Your account has been successfully created. Please check your
					email for further instructions to complete the setup process.
				</Alert>
			)}
			<Paper
				component={Form}
				method="post"
				withBorder
				shadow="md"
				p={30}
				mt={30}
				radius="md"
			>
				<TextInput
					label="Email"
					placeholder="you@email.com"
					inputMode="email"
					// value={"golfie@wiseassistant.com"}
					name="email"
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					// value="Golf2604!"
					mt="md"
					name="password"
				/>
				<Group position="apart" mt="lg">
					<Checkbox label="Remember me" />
					<Anchor component="button" size="sm">
						Forgot password?
					</Anchor>
				</Group>
				<Button
					fullWidth
					mt="xl"
					type="submit"
					// loading={mutation.isLoading}
				>
					Sign in
				</Button>
			</Paper>
		</Container>
	);
}
