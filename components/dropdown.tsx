import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { DownArrow, getIconByName, IconTypes } from "./icons";
import { generateUid } from "./utils";

export enum DropDownVariant {
	Gradient = "Gradient",
	Transparent = "Transparent",
}

export interface DropDownProps extends React.HTMLProps<HTMLDivElement> {
	icon?: IconTypes;
	open?: boolean;
	title: string;
	value?: string;
	variant?: DropDownVariant;
	onValueChange?: (value: string) => void;
}

export interface DropDownItemProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value?: string;
	icon?: IconTypes;
}

const DropDownContext = createContext({
	currentSelectionId: "",
	variant: DropDownVariant.Gradient,
	onToggle: (id: string) => {},
});

export default function DropDown({
	children,
	className,
	icon,
	open,
	title,
	value,
	variant = DropDownVariant.Gradient,
	onValueChange,
	onMouseLeave,
	...props
}: DropDownProps) {
	const [currentSelectionId, setCurrentSelectionId] = useState(value || "");
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	const onToggle = (id: string) => {
		setCurrentSelectionId(id);
		onValueChange && onValueChange(id);
	};

	const onLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
		setIsOpen(false);
		onMouseLeave && onMouseLeave(e);
	};

	switch (variant) {
		case DropDownVariant.Gradient:
			return (
				<div
					className={`
					relative
					w-max
					`}
					onMouseLeave={onLeave}
					{...props}
				>
					<button
						className={`
						bg-gradient-to-r
						from-principalRoyalBlue
						to-brandLightBlue
						text-white
						font-medium
						text-xs
						flex
						items-center
						py-4
						pl-10
						pr-7
						rounded-tl-regular
						rounded-tr-regular
						cursor-default

						${isOpen ? "" : "rounded-bl-regular rounded-br-regular"}

						${className}
						`}
						onMouseEnter={() => setIsOpen(true)}
					>
						{title}
						<DownArrow
							className="ml-4"
							style={{
								width: "12px",
								height: "12px",
							}}
						/>
					</button>
					<div
						className={`
						absolute
						bottom-0
						left-0
						transform
						translate-y-full
						flex
						flex-col
						w-full
						shadow-lg
						rounded-b-regular
						bg-principalRoyalBlue

						${isOpen ? "visible" : "invisible"}
						`}
					>
						<DropDownContext.Provider
							value={{
								currentSelectionId,
								onToggle,
								variant: DropDownVariant.Gradient,
							}}
						>
							{children}
						</DropDownContext.Provider>
					</div>
				</div>
			);

		case DropDownVariant.Transparent:
			const Icon = getIconByName(icon);

			return (
				<div
					className={`
					relative
					w-max
					`}
					onMouseLeave={onLeave}
					{...props}
				>
					<button
						className={`
						text-principalRoyalBlue
						font-medium
						text-sm
						flex
						items-center
						py-4
						pl-10
						pr-7
						rounded-tl-regular
						rounded-tr-regular
						cursor-default
						bg-white

						${isOpen ? "" : "rounded-bl-regular rounded-br-regular"}

						${className}
						`}
						onMouseEnter={() => setIsOpen(true)}
					>
						{Icon && (
							<Icon
								className="mr-2"
								style={{
									width: "18px",
									height: "18px",
								}}
							/>
						)}
						<span
							style={{
								minWidth: "3rem",
							}}
						>
							{title}
						</span>
						<DownArrow
							className="ml-4"
							style={{
								width: "12px",
								height: "12px",
							}}
							fill={"#005EBE"}
						/>
					</button>
					<div
						className={`
						absolute
						bottom-0
						left-0
						transform
						translate-y-full
						flex
						flex-col
						w-full
						bg-white

						${isOpen ? "visible" : "invisible"}
						`}
					>
						<DropDownContext.Provider
							value={{
								currentSelectionId,
								onToggle,
								variant: DropDownVariant.Transparent,
							}}
						>
							{children}
						</DropDownContext.Provider>
					</div>
				</div>
			);

		default:
			return null;
	}
}

export function DropDownItem({
	onClick,
	children,
	className,
	icon,
	value,
	...props
}: DropDownItemProps) {
	const id = useRef(value || generateUid());
	const { currentSelectionId, variant, onToggle } =
		useContext(DropDownContext);

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClick && onClick(event);
		onToggle(id.current);
	};

	const isActive = currentSelectionId === id.current;

	switch (variant) {
		case DropDownVariant.Gradient:
			const Icon = getIconByName(icon);

			return (
				<button
					className={`
						text-white
						text-xs
						font-medium
						px-5
						py-4
						flex
						justify-between
						items-center
						
						${className || ""}
						`}
					onClick={handleClick}
					{...props}
				>
					{children}
					{Icon && (
						<div
							className={`
							border
							border-white
							border-solid
							rounded-full
							w-6
							h-6
							flex
							items-center
							justify-center
							`}
						>
							<Icon
								style={{
									width: "12px",
									height: "12px",
								}}
							/>
						</div>
					)}
				</button>
			);

		case DropDownVariant.Transparent:
			const selectSize = {
				width: "12px",
				height: "12px",
			};
			return (
				<button
					className={`
						text-principalRoyalBlue
						text-xxs
						font-medium
						px-5
						py-4
						flex
						justify-between
						items-center
						text-left
						
						${className || ""}
						`}
					onClick={handleClick}
					{...props}
				>
					{children}

					<div>
						{isActive ? (
							<div
								className={`
							border
							border-principalRoyalBlue
							border-solid
							rounded-full
							box-border
							`}
								style={selectSize}
							>
								<div
									className={`
									border
									border-white
									border-solid
									bg-principalRoyalBlue
									rounded-full
									w-full
									h-full
									box-border
									`}
								/>
							</div>
						) : (
							<div
								className={`
								border
								border-principalRoyalBlue
								border-solid
								rounded-full
								box-border
								`}
								style={selectSize}
							/>
						)}
					</div>
				</button>
			);

		default:
			return null;
	}
}
