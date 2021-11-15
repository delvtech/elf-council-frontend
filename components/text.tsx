import React from "react";

export enum TextVariant {
	Header = "Header",
	SubHeader = "SubHeader",
	SecondaryHeader = "SecondaryHeader",
	Navigation = "Navigation",
	ActiveNavigation = "ActiveNavigation",
	PastNavigation = "PastNavigation",
	Body = "Body",
}

export interface TextProps
	extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
	ignoreColor?: boolean;
	variant?: TextVariant;
}

export default function Text({
	children,
	className,
	ignoreColor,
	variant,
	...props
}: TextProps) {
	const bodyText = (
		<p
			className={`
			text-base

			${ignoreColor ? "" : "text-textGrey"}
			
			${className || ""}
			`}
			{...props}
		>
			{children}
		</p>
	);

	switch (variant) {
		case TextVariant.Header:
			return (
				<h1
					className={`
					font-bold
					text-l28
					
					${ignoreColor ? "" : "text-principalRoyalBlue"}

					${className || ""}
					`}
					{...props}
				>
					{children}
				</h1>
			);

		case TextVariant.SecondaryHeader:
			return (
				<h2
					className={`
					text-l22
					
					${ignoreColor ? "" : "text-principalRoyalBlue"}

					${className || ""}
						`}
					{...props}
				>
					{children}
				</h2>
			);

		case TextVariant.SubHeader:
			return (
				<h3
					className={`
					font-medium
					text-l22
					
					${ignoreColor ? "" : "text-yieldLightBlue"}

					${className || ""}
						`}
					{...props}
				>
					{children}
				</h3>
			);

		case TextVariant.Navigation:
			return (
				<h4
					className={`
					text-xl
					
					${ignoreColor ? "" : "text-principalRoyalBlue"}
					
					${className || ""}
						`}
					{...props}
				>
					{children}
				</h4>
			);

		case TextVariant.ActiveNavigation:
			return (
				<h4
					className={`
					text-xl
					font-bold
					
					${ignoreColor ? "" : "text-principalRoyalBlue"}

					${className || ""}
					`}
					{...props}
				>
					{children}
				</h4>
			);

		case TextVariant.PastNavigation:
			return (
				<h4
					className={`
					text-xl
					opacity-60
					
					${ignoreColor ? "" : "text-principalRoyalBlue"}

					${className || ""}
					`}
					{...props}
				>
					{children}
				</h4>
			);

		case TextVariant.Body:
			return bodyText;

		default:
			return bodyText;
	}
}
