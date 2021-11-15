import React from "react";
import { IconProps } from "./propType";

export default function LocalGas({ fill, style, ...props }: IconProps) {
	return (
		<svg
			width="17"
			height="18"
			viewBox="0 0 17 18"
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
				d="M15.77 4.23L15.78 4.22L12.06 0.5L11 1.56L13.11 3.67C12.17 4.03 11.5 4.93 11.5 6C11.5 7.38 12.62 8.5 14 8.5C14.36 8.5 14.69 8.42 15 8.29V15.5C15 16.05 14.55 16.5 14 16.5C13.45 16.5 13 16.05 13 15.5V11C13 9.9 12.1 9 11 9H10V2C10 0.9 9.1 0 8 0H2C0.9 0 0 0.9 0 2V18H10V10.5H11.5V15.5C11.5 16.88 12.62 18 14 18C15.38 18 16.5 16.88 16.5 15.5V6C16.5 5.31 16.22 4.68 15.77 4.23ZM8 7H2V2H8V7ZM14 7C13.45 7 13 6.55 13 6C13 5.45 13.45 5 14 5C14.55 5 15 5.45 15 6C15 6.55 14.55 7 14 7Z"
				fill={fill || "#005EBE"}
			/>
		</svg>
	);
}
