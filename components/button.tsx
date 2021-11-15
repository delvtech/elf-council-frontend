import React from "react";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean;
	gradientButton?: boolean;
	tokenButton?: boolean;
	whiteButton?: boolean;
}

export default function Button({
	children,
	className,
	fullWidth,
	gradientButton,
	tokenButton,
	whiteButton,
	style,
	...props
}: ButtonProps) {
	const preDefinedSizes = {
		width: gradientButton ? "163px" : tokenButton ? "150px" : undefined,
		height: gradientButton ? "49px" : tokenButton ? "33px" : undefined,
		padding: gradientButton || tokenButton ? "0px" : undefined,
	};

	return (
		<button
			className={`
			box-border
			font-medium
			duration-200
			inline-block
			p-btn
			rounded-regular
			text-center
			text-sm
			transition

			${
				!(gradientButton || tokenButton || whiteButton)
					? "text-xxs bg-principalRoyalBlue text-white hover:bg-brandLightBlue hover:text-clay"
					: "shadow-btn hover:shadow-btnAccent"
			}
			${fullWidth ? "w-full" : "w-auto"}
			${
				tokenButton
					? "text-sm text-white bg-gradient-to-br from-brandLightBlue to-principalRoyalBlue"
					: ""
			}
			${whiteButton ? "bg-hackerSky text-lg text-principalRoyalBlue" : ""}
			${
				gradientButton
					? "text-lg text-white bg-gradient-to-br from-brandLightBlue to-principalRoyalBlue"
					: ""
			}
			
			${className || ""}
			`}
			style={{
				...preDefinedSizes,
				...(style || {}),
			}}
			{...props}
		>
			{children}
		</button>
	);
}
