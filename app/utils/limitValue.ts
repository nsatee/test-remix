import { isEmpty } from "lodash";
import { StatusEnum } from "../api/common.type";
import { CreatorTier } from "../api/services/SetupPreferences";

export const limitValue = (
	gotTier?: CreatorTier[] | null,
	status?: StatusEnum
) => {
	const isTire = (tire: CreatorTier) => gotTier?.includes(tire);
	const limitByTier = (
		limiter: Partial<Record<StatusEnum, number>>,
		allView?: number
	) => {
		if (isEmpty(status)) return allView || limiter.Assessing;
		if (status === "Assessing") return limiter.Assessing;
		if (status === "Scheduling") return limiter.Scheduling;
		if (status === "Completed") return limiter.Completed;
		if (status === "Confirmed") return limiter.Confirmed;
		if (status === "Passed") return limiter.Passed;
		if (status === "Posted") return limiter.Posted;
	};
	if (isEmpty(gotTier)) {
		return limitByTier({
			Assessing: 3,
			Scheduling: 8,
			Posted: 3,
		});
	}
	if (isTire("Growth")) {
		return limitByTier({
			Assessing: 7,
			Scheduling: 12,
			Posted: 7,
		});
	}
	if (isTire("Scale")) {
		return limitByTier({
			Assessing: 10,
			Scheduling: 15,
			Posted: 10,
		});
	}
	if (isTire("Tier I")) {
		return limitByTier({
			Assessing: 20,
			Scheduling: 25,
			Posted: 20,
		});
	}
	if (isTire("Tier I")) {
		return limitByTier({
			Assessing: 50,
			Scheduling: 55,
			Posted: 50,
		});
	}
};
