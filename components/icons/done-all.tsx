import React from "react";
import { IconProps } from "./propType";

export default function DoneAll({ fill, style, ...props }: IconProps) {
	return (
		<svg
			width="24"
			height="14"
			viewBox="0 0 24 14"
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
				d="M18.1574 1.41L16.7019 0L10.1574 6.34L11.6129 7.75L18.1574 1.41ZM22.5342 0L11.6129 10.58L7.29806 6.41L5.84258 7.82L11.6129 13.41L24 1.41L22.5342 0ZM0 7.82L5.77032 13.41L7.22581 12L1.46581 6.41L0 7.82Z"
				fill={fill || "#007F00"}
			/>
		</svg>
	);
}
