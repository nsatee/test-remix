import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { http_loginWithSesameKey } from "../../api/services/User";
import { setCookie } from "cookies-next";

const SesemeKeyValidation = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const authKey = searchParams.get("s");

	useQuery(
		["sesame"],
		async () => {
			if (authKey) {
				const result = await http_loginWithSesameKey(authKey);
				setCookie("session", result.key);
				navigate("/", { replace: true });
				window.location.href = "/agent/dashboard";
				return null;
			}
			return null;
		},
		{
			suspense: false,
		}
	);
	return <Outlet />;
};

export default SesemeKeyValidation;
