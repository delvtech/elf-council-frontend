import React from "react";

import classes from "./statusButton.module.css";

export enum EStatus {
	Failed = "failed",
	Normal = "normal",
	Queued = "queued",
	Success = "success",
}

export interface StatusButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	status: EStatus;
}

export default function StatusButton({
	className,
	status,
	...props
}: StatusButtonProps) {
	return (
		<button
			className={`${classes.base} ${classes[status]} ${className}`}
			{...props}
		>
			<span />
			{status === EStatus.Success
				? "Executed"
				: status === EStatus.Failed
				? "Failed"
				: status === EStatus.Queued
				? "Queued"
				: "Execute"}
		</button>
	);
}
