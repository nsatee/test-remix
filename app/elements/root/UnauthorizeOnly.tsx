import { getCookie } from "cookies-next";
import { Navigate, Outlet } from "react-router-dom";

const UnauthorizeOnly = () => {
	const cookie = getCookie("session");
	if (cookie) {
		return <Navigate to="/agent/dashboard" replace />;
	}
	return <Outlet />;
};

export default UnauthorizeOnly;
