import React from "react";

export enum CardVariant {
	Default = "Default",
	Outlined = "Outlined",
	Primary = "Primary",
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	shadow?: boolean;
	variant?: CardVariant;
}

export default function Card({
	children,
	className,
	shadow,
	variant,
	...props
}: CardProps) {
	const isPrimary = variant === CardVariant.Primary;
	const isOutlined = variant === CardVariant.Outlined;
	const isDefault = !(isPrimary || isOutlined);

	return (
		<div
			className={`
				box-border
				py-4
				px-6
				rounded-regular
				border

				${shadow ? "shadow-md" : ""}
				${isPrimary ? "bg-principalRoyalBlue border-principalRoyalBlue" : ""}
				${isOutlined ? "bg-white border-principalRoyalBlue" : ""}
				${isDefault ? "bg-white border-white" : ""}
				
				${className || ""}
				`}
			{...props}
		>
			{children}
		</div>
	);
}
