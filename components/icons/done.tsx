import React from "react";
import { IconProps } from "./propType";

export default function Done({ fill, style, ...props }: IconProps) {
	return (
		<svg
			width="18"
			height="14"
			viewBox="0 0 18 14"
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
				d="M5.9999 11.2L1.7999 7.00001L0.399902 8.40001L5.9999 14L17.9999 2.00001L16.5999 0.600006L5.9999 11.2Z"
				fill={fill || "#007F00"}
			/>
		</svg>
	);
}
