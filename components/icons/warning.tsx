import React from "react";
import { IconProps } from "./propType";

export default function Warning({ fill, style, ...props }: IconProps) {
	return (
		<svg
			width="24"
			height="19"
			viewBox="0 0 24 19"
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
				d="M0 19H24L12 0L0 19ZM13.0909 16H10.9091V14H13.0909V16ZM13.0909 12H10.9091V8H13.0909V12Z"
				fill={fill || "#F73030"}
			/>
		</svg>
	);
}
