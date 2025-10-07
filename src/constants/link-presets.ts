import { LinkPreset, type NavBarLink } from "@/types/config";

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
	[LinkPreset.Home]: {
		name: "홈",
		url: "/",
	},
	[LinkPreset.About]: {
		name: "소개",
		url: "/about/",
	},
	[LinkPreset.Archive]: {
		name: "타임라인",
		url: "/archive/",
	},
	[LinkPreset.Series]: {
		name: "시리즈",
		url: '/series/',
	},
	[LinkPreset.Friends]: {
		name: "친구",
		url: '/friends/',
	},
};
