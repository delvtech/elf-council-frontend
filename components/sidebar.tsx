import React from "react";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({
	children,
	className,
	...props
}: SidebarProps) {
	return (
		<aside
			className={`
			border-2
			border-solid
			border-brandLightBlue
			bg-white
			w-max
			h-screen
			px-11
			py-7
			flex
			flex-col
			
			${className || ""}
			`}
			{...props}
		>
			<img
				src="/assets/council-logo.png"
				className={`
				mb-7
				`}
			/>
			{children}
		</aside>
	);
}
