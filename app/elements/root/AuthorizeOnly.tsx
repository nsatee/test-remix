import { Center, Loader } from "@mantine/core";
import { getCookie } from "cookies-next";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

import { ValidateUser } from "./ValidateUser";
import { PageContainer } from "../../components/PageContainer";

const AuthorizeOnly = () => {
	const cookie = getCookie("session");
	if (!cookie) {
		return (
			<Navigate to={`/sign-in?from=${window.location.pathname}`} replace />
		);
	}

	return (
		<Suspense
			fallback={
				<PageContainer>
					<Center h="100%">
						<Loader />
					</Center>
				</PageContainer>
			}
		>
			<ValidateUser />
		</Suspense>
	);
};

export default AuthorizeOnly;
