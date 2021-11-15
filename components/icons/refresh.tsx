import React from "react";
import { IconProps } from "./propType";

export default function Refresh({ fill, style, ...props }: IconProps) {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				width: "20px",
				height: "20px",
				...style,
			}}
			{...props}
		>
			<path
				d="M12.7955 2.20312C11.4353 0.84375 9.56848 0 7.49531 0C3.34897 0 0 3.35625 0 7.5C0 11.6438 3.34897 15 7.49531 15C10.9944 15 13.9118 12.6094 14.7467 9.375H12.7955C12.0263 11.5594 9.94372 13.125 7.49531 13.125C4.39024 13.125 1.86679 10.6031 1.86679 7.5C1.86679 4.39687 4.39024 1.875 7.49531 1.875C9.05253 1.875 10.4409 2.52188 11.454 3.54375L8.4334 6.5625H15V0L12.7955 2.20312Z"
				fill={fill || "#005EBE"}
			/>
		</svg>
	);
}
