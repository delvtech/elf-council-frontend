import React from "react";

export interface IconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
	fill?: string;
}

export type IconTypes =
	| "ArrowForward"
	| "Copy"
	| "Close"
	| "DoneAll"
	| "Done"
	| "DownArrow"
	| "Help"
	| "HourGlass"
	| "HowToVote"
	| "LocalGas"
	| "OpenInNewTab"
	| "Refresh"
	| "Twitter"
	| "Warning";
