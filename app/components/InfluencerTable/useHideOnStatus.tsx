import { useSearchParams } from "react-router-dom";
import { StatusEnum } from "../../api/common.type";

export const useHideOnStatus = () => {
	const [searchParams] = useSearchParams();
	function hideOnStatus<T>(status: StatusEnum[], element: T) {
		if (status.includes(searchParams.get("status") as StatusEnum)) {
			return null;
		}
		return element;
	}

	function showOnStatus<T>(status: StatusEnum[], element: T) {
		if (status.includes(searchParams.get("status") as StatusEnum)) {
			return element;
		}
		return null;
	}

	return { showOnStatus, hideOnStatus };
};
