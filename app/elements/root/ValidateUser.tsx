import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
	http_getCreatorFromAirtableWithEmail,
	http_getCreatorFromBrandAirtableWithEmail,
	http_getCurrentProfile,
	http_getCurrentUser,
} from "../../api/services/User";
import { MeType, useMe } from "../../stores/Me.store";
import { http_getGroupDataByEmail } from "../../api/services/Group";

const ONBOARDING_PATH_NAME = "/onboarding";
const DASHBOARD_PATH_NAME = "/dashboard";
const CREATE_PREFERENCES_PATH_NAME = "/create-preferences";

export const ValidateUser = () => {
	const location = useLocation();
	const [me, setMe] = useMe();
	const { isError } = useQuery(["me"], async () => {
		const res = await Promise.all([
			await http_getCurrentUser(),
			await http_getCurrentProfile(),
			await http_getCreatorFromAirtableWithEmail(),
			await http_getCreatorFromBrandAirtableWithEmail(),
			await http_getGroupDataByEmail(),
		]);

		const result: MeType = {
			user: res[0],
			profile: res[1],
			hasProfile: Boolean(res[1]?.username),
			myAirtable: res[2],
			myBrandAirtable: res[3],
			group: res[4],
		};
		setMe(result);
		return { result };
	});

	if (isError) {
		return (
			<Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
				Something went wrong, please try to refresh the page again.
			</Alert>
		);
	}

	// No public profile set up yet
	if (
		isEmpty(me?.profile.username) &&
		location.pathname !== ONBOARDING_PATH_NAME
	) {
		return <Navigate to={ONBOARDING_PATH_NAME} replace />;
	}

	// Has set up public profile but no preferences
	if (
		!isEmpty(me?.profile.username) &&
		isEmpty(me?.myAirtable) &&
		location.pathname !== CREATE_PREFERENCES_PATH_NAME
	) {
		return <Navigate to={CREATE_PREFERENCES_PATH_NAME} replace />;
	}

	// Has set up public profile but wanna go to onboarding page again
	if (
		location.pathname === ONBOARDING_PATH_NAME &&
		!isEmpty(me?.profile.username)
	) {
		return <Navigate to={DASHBOARD_PATH_NAME} replace />;
	}

	// Has set up public profile but no preferences
	if (
		!isEmpty(me?.profile.username) &&
		!isEmpty(me?.myAirtable) &&
		location.pathname === CREATE_PREFERENCES_PATH_NAME
	) {
		return <Navigate to={DASHBOARD_PATH_NAME} replace />;
	}

	// Go to wherever route
	return <Outlet />;
};
