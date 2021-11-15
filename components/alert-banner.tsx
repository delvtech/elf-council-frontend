import React, { useEffect, useState } from "react";
import { Close } from "./icons";

export interface AlertBannerProps {
	bannerClassName?: string;
	children?: React.ReactNode;
	open?: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AlertBanner({
	bannerClassName,
	children,
	open,
	onClose,
}: AlertBannerProps) {
	const [isOpen, setIsOpen] = useState(open || false);

	useEffect(() => {
		setIsOpen(open || false);
	}, [open]);

	const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
		setIsOpen(false);
		onClose && onClose(e);
	};

	return isOpen ? (
		<div
			className={`
			fixed
			box-border
			bottom-0
			left-0
			w-screen
			px-5
			pb-4
			`}
		>
			<div
				className={`
				bg-principalRoyalBlue
				text-white
				rounded-regular
				py-6
				px-7
				flex
				translate-y-0
				animate-slideIn

				${bannerClassName}
				`}
			>
				<div
					className={`
					flex-1
					pr-2
					text-center
					font-medium
					`}
				>
					{children}
				</div>

				<button onClick={handleClose}>
					<Close className="mr-5" />
				</button>
			</div>
		</div>
	) : null;
}
