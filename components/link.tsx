import React from "react";
import { default as NextLink } from "next/link";

export interface LinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
	active?: boolean;
	bannerLink?: boolean;
	externalLink?: boolean;
}

export default function Link({
	active,
	bannerLink,
	children,
	className,
	externalLink,
	href,
	...props
}: LinkProps) {
	const link = (
		<a
			className={`
			no-underline
			transition
			duration-200
			cursor-pointer

			${active ? "font-bold" : "font-medium"}
			${
				bannerLink
					? "text-goldYellow hover:text-white"
					: "text-principalRoyalBlue hover:text-principalBlue"
			}
		
			${className || ""}
			`}
			href={href}
			target={externalLink ? "_blank" : undefined}
			{...props}
		>
			{children}
		</a>
	);

	return externalLink ? link : <NextLink href={href}>{link}</NextLink>;
}
