import React from "react";

import classes from "./button.module.css";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean;
	gradient?: boolean;
	tokenButton?: boolean;
	whiteButton?: boolean;
}

export default function Button({
	children,
	className,
	fullWidth,
	gradient,
	tokenButton,
	whiteButton,
	...props
}: ButtonProps) {
	return (
		<button
			className={`${classes.base} ${fullWidth && classes.fullwidth} ${
				gradient && classes.gradient
			} ${tokenButton && classes.tokenButton} ${
				whiteButton && classes.whiteButton
			} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
