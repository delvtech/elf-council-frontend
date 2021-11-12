import React from "react";
import { default as NextLink } from "next/link";

import classes from "./link.module.css";

export interface LinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
	bannerLink?: boolean;
}

export default function Link({
	children,
	className,
	bannerLink,
	href,
	...props
}: LinkProps) {
	return (
		<NextLink href={href || "#"}>
			<a
				className={`${classes.base} ${
					bannerLink && classes.bannerLink
				} ${className}`}
				{...props}
			>
				{children}
			</a>
		</NextLink>
	);
}
