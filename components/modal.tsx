import React, { useEffect, useState } from "react";
import Card from "./card";

export interface ModalProps {
	children: React.ReactNode;
	open?: boolean;
	onClose?: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
	const [isOpen, setOpen] = useState(false || open);

	useEffect(() => {
		setOpen(open);
	}, [open]);

	const handleClose = () => {
		setOpen(false);
		onClose && onClose();
	};

	return isOpen ? (
		<div
			className={`
			flex
			justify-center
			items-center
			fixed
			top-0
			left-0
			h-screen
			w-screen
			box-border
			px-2
			py-10
			md:p-20
			lg:px-52
			lg:py-24
			xxl:px-80
			xxl:py-40
			`}
		>
			<div
				className={`
				fixed
				bg-black
				h-screen
				w-screen
				opacity-40
				z-10
				`}
				onClick={handleClose}
			/>
			<Card
				className={`
				relative
				z-20
				max-w-xs
				max-w-full
				max-h-full
				overflow-y-auto
				`}
			>
				{children}
			</Card>
		</div>
	) : (
		<></>
	);
}
