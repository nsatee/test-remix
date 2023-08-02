import { atom, useAtom } from "jotai";
import { UserInfo, UserProfile } from "../api/services/User";
import { SetupPreferenceInputType } from "../api/services/SetupPreferences";
import { GroupDataResponse } from "../api/services/Group";

export type MeType = {
	user: UserInfo;
	profile: UserProfile;
	hasProfile: boolean;
	myAirtable: SetupPreferenceInputType | null;
	myBrandAirtable: SetupPreferenceInputType | null;
	group: GroupDataResponse | null;
};

export const meAtom = atom<MeType | null>(null);
export const useMe = () => useAtom(meAtom);
