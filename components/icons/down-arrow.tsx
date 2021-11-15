import React from "react";
import { IconProps } from "./propType";

export default function DownArrow01({ fill, style, ...props }: IconProps) {
	return (
		<svg
			width="12"
			height="8"
			viewBox="0 0 12 8"
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
				d="M10.59 0.589966L6 5.16997L1.41 0.589966L0 1.99997L6 7.99997L12 1.99997L10.59 0.589966Z"
				fill={fill || "white"}
			/>
		</svg>
	);
}
