import {
	ArrowForward,
	Close,
	Copy,
	Done,
	DoneAll,
	DownArrow,
	Help,
	HourGlass,
	HowToVote,
	LocalGas,
	OpenInNewTab,
	Refresh,
	Twitter,
	Warning,
} from ".";
import { IconTypes } from "./propType";

export const getIconByName = (name: IconTypes) => {
	switch (name) {
		case "ArrowForward":
			return ArrowForward;
		case "Copy":
			return Copy;
		case "Close":
			return Close;
		case "DoneAll":
			return DoneAll;
		case "Done":
			return Done;
		case "DownArrow":
			return DownArrow;
		case "Help":
			return Help;
		case "HourGlass":
			return HourGlass;
		case "HowToVote":
			return HowToVote;
		case "LocalGas":
			return LocalGas;
		case "OpenInNewTab":
			return OpenInNewTab;
		case "Refresh":
			return Refresh;
		case "Twitter":
			return Twitter;
		case "Warning":
			return Warning;
		default:
			return null;
	}
};
