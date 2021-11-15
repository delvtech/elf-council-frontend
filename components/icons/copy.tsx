import React from "react";
import { IconProps } from "./propType";

export default function Copy({ fill, style, ...props }: IconProps) {
	return (
		<svg
			width="16"
			height="19"
			viewBox="0 0 16 19"
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
				d="M11.6667 0H1.66667C0.75 0 0 0.75 0 1.66667V13.3333H1.66667V1.66667H11.6667V0ZM14.1667 3.33333H5C4.08333 3.33333 3.33333 4.08333 3.33333 5V16.6667C3.33333 17.5833 4.08333 18.3333 5 18.3333H14.1667C15.0833 18.3333 15.8333 17.5833 15.8333 16.6667V5C15.8333 4.08333 15.0833 3.33333 14.1667 3.33333ZM14.1667 16.6667H5V5H14.1667V16.6667Z"
				fill={fill || "white"}
			/>
		</svg>
	);
}
