import React from "react";

import { Done, DoneAll, HourGlass, Refresh, Warning } from "./icons";

export enum TransactionAlertsVariant {
	ApproveTransaction = "ApproveTransaction",
	TransactionApproved = "TransactionApproved",
	TransactionRejected = "TransactionRejected",
	ApproveStaking = "ApproveStaking",
	StakingApproved = "StakingApproved",
}

export interface TransactionAlertsProps {
	variant?: TransactionAlertsVariant;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function TransactionAlerts({
	variant,
	onClick,
}: TransactionAlertsProps) {
	const alertSize = {
		width: "302px",
		height: "56px",
	};

	switch (variant) {
		case TransactionAlertsVariant.ApproveTransaction:
			return (
				<div
					className={`
					border
					border-solid
					border-principalRoyalBlue
					rounded-regular
					flex
					items-center
					justify-between
					text-principalRoyalBlue
					text-lg
					font-medium
					`}
					style={alertSize}
				>
					<HourGlass fill="#005EBE" className="animate-spin ml-6" />
					Approve Transaction
					<button onClick={onClick}>
						<Done fill="#005EBE" className="mr-5" />
					</button>
				</div>
			);

		case TransactionAlertsVariant.TransactionApproved:
			return (
				<div
					className={`
					border
					border-solid
					border-principalRoyalBlue
					rounded-regular
					flex
					items-center
					justify-center
					text-principalRoyalBlue
					text-lg
					font-medium
					`}
					style={alertSize}
				>
					<DoneAll className="mr-3.5" />
					Transaction Approved
				</div>
			);

		case TransactionAlertsVariant.TransactionRejected:
			return (
				<div
					className={`
					border
					border-solid
					border-principalRoyalBlue
					rounded-regular
					flex
					items-center
					justify-between
					text-principalRoyalBlue
					text-lg
					font-medium
					`}
					style={alertSize}
				>
					<Warning className="ml-6" />
					Transaction Rejected
					<button onClick={onClick}>
						<Refresh className="mr-5" />
					</button>
				</div>
			);

		case TransactionAlertsVariant.ApproveStaking:
			return (
				<div
					className={`
					border
					border-solid
					border-principalRoyalBlue
					rounded-regular
					flex
					items-center
					justify-between
					text-principalRoyalBlue
					text-lg
					font-medium
					`}
					style={alertSize}
				>
					<HourGlass fill="#005EBE" className="animate-spin ml-6" />
					Approve Staking
					<button onClick={onClick}>
						<Done fill="#005EBE" className="mr-5" />
					</button>
				</div>
			);

		case TransactionAlertsVariant.StakingApproved:
			return (
				<div
					className={`
					border
					border-solid
					border-principalRoyalBlue
					rounded-regular
					flex
					items-center
					justify-center
					text-principalRoyalBlue
					text-lg
					font-medium
					`}
					style={alertSize}
				>
					<DoneAll className="mr-3.5" />
					Staking Approved
				</div>
			);

		default:
			return null;
	}
}
