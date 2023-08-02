import { useForm } from "@mantine/form";
import { compact, isEmpty } from "lodash";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { InsertBrandInput } from "../../api/services/Brand";
import { useMe } from "../../stores/Me.store";
import { fullname } from "../../utils/fullname";
import {
	checkEmail,
	checkEmpty,
	checkPhone,
	checkUrl,
} from "../../utils/validateText";

export const useCreateBrandPageForm = ({
	initValue = {},
}: {
	initValue?: Partial<InsertBrandInput>;
	onSubmit?: (input: InsertBrandInput) => void;
}) => {
	const [me] = useMe();
	const params = useParams();

	const form = useForm<InsertBrandInput>({
		initialValues: {
			name: "",
			market: [],
			description: "",
			instagramLink: "",
			tikTokLink: "",
			twitterLink: "",
			websiteLink: "",
			youTubeLink: "",
			facebookLink: "",
			contactEmail: me?.myAirtable?.emailAddress || "",
			contactName: fullname(me?.profile.first_name, me?.profile.last_name),
			contactPhoneNumber: me?.myAirtable?.phoneNumber || "",
			group: params.groupId ? compact([params.groupId]) : (undefined as any),
			state: [],
			businessSubType: [],
			businessType: [],
			image: [],
			bannerImage: [],
			...initValue,
		},
		validate: {
			name: (val) => checkEmpty(val, "Required"),
			contactName: (val) => checkEmpty(val, "Required", true),
			contactEmail: (val) => checkEmail(val, "Invalid value", true),
			contactPhoneNumber: (val) => checkPhone(val, "Invalid value", true),
			market: (val) => checkEmpty(val, "Required"),
			websiteLink: (val) => checkUrl(val, "Invalid value", true),
			instagramLink: (val) => checkUrl(val, "Invalid value", true),
			tikTokLink: (val) => checkUrl(val, "Invalid value", true),
			youTubeLink: (val) => checkUrl(val, "Invalid value", true),
			facebookLink: (val) => checkUrl(val, "Invalid value", true),
			twitterLink: (val) => checkUrl(val, "Invalid value", true),
		},
	});

	useEffect(() => {
		if (!isEmpty(form.errors)) {
			window.scrollTo({
				top: 0,
			});
		}
	}, [form.errors]);

	return {
		form,
	};
};
