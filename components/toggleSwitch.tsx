import React, { createContext, useState, useContext, useRef } from "react";
import { generateUid } from "./utils";

export interface ToggleSwitchProps extends React.HTMLProps<HTMLDivElement> {
	value?: string;
	onValueChange?: (value: string) => void;
}

export interface ToggleSwitchButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value?: string;
}

const ToggleSwitchContext = createContext({
	currentSelectionId: "",
	onToggle: (id: string) => {},
});

export default function ToggleSwitch({
	children,
	className,
	value,
	onValueChange,
	...props
}: ToggleSwitchProps) {
	const [currentSelectionId, setCurrentSelectionId] = useState(value || "");

	const onToggle = (id: string) => {
		setCurrentSelectionId(id);
		onValueChange && onValueChange(id);
	};

	return (
		<div
			className={`
				rounded-regular
                bg-hackerSky
                w-max
                shadow-lg
                				
				${className || ""}
				`}
			{...props}
		>
			<ToggleSwitchContext.Provider
				value={{ currentSelectionId, onToggle }}
			>
				{children}
			</ToggleSwitchContext.Provider>
		</div>
	);
}

export function ToggleSwitchButton({
	onClick,
	children,
	className,
	value,
	...props
}: ToggleSwitchButtonProps) {
	const id = useRef(value || generateUid());
	const { currentSelectionId, onToggle } = useContext(ToggleSwitchContext);

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClick && onClick(event);
		onToggle(id.current);
	};

	const isActive = currentSelectionId === id.current;

	return (
		<button
			className={`
                rounded-regular
                flex-1
                px-7
                py-3
                text-principalRoyalBlue
                font-medium

                ${isActive ? "bg-paleLily" : ""}
                
                ${className || ""}
                `}
			onClick={handleClick}
			{...props}
		>
			{children}
		</button>
	);
}
