import React from "react";

export interface IndicatorProps {
	accent?: boolean;
	children: React.ReactNode;
	isActive?: boolean;
}

export default function Indicator({
	accent,
	children,
	isActive,
}: IndicatorProps) {
	const color = accent ? "votingGreen" : "indianYellow";
	return (
		<span
			className={`
			relative
			inline-block
			`}
		>
			{children}

			{isActive && (
				<span
					className={`
					absolute
					flex
					h-5
					w-5
					top-0
					right-0
					transform
					translate-x-2
					-translate-y-1.5
					`}
				>
					<span
						className={`
						absolute
						rounded-full
						h-5
						w-5
						bg-${color}
						opacity-75
						animate-ping
						`}
					/>
					<span
						className={`
						h-5
						w-5
						bg-${color}
						rounded-full
						`}
					/>
				</span>
				// <span className="flex h-3 w-3">
				// 	<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
				// 	<span className="relative inline-flex rounded-full h-5 w-3 bg-purple-500"></span>
				// </span>
			)}
		</span>
	);
}
