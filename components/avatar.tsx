import React from "react";
import {
	generateRandomColor,
	generateRandomInt,
	generateRandomRotation,
} from "./utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLOrSVGElement> {
	children: undefined;
	dimension?: number;
}

interface AvatarRectangleProps {
	dimension: number;
}

export default function Avatar({
	className,
	dimension = 30,
	style,
	...props
}: AvatarProps) {
	const rootSize = {
		width: dimension,
		height: dimension,
		backgroundColor: generateRandomColor(),
	};

	return (
		<svg
			viewBox={`0 0 ${dimension} ${dimension}`}
			className={`
                inline-block
                rounded-full
                `}
			style={{
				...rootSize,
				...style,
			}}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<AvatarRectangle dimension={dimension} />
			<AvatarRectangle dimension={dimension} />
			<AvatarRectangle dimension={dimension} />
		</svg>
	);
}

const AvatarRectangle = ({ dimension }: AvatarRectangleProps) => {
	const maxRectSize = Math.round(dimension / 1.1);
	const minRectSize = Math.round(dimension / 1.25);
	const maxRotation = Math.round(dimension);
	const minRotation = Math.round(dimension / 20);

	const rectSize = generateRandomInt(minRectSize, maxRectSize);

	return (
		<rect
			fill={`${generateRandomColor()}`}
			width={rectSize}
			height={rectSize}
			x={dimension / 2 - rectSize / 2}
			y={dimension / 2 - rectSize / 2}
			transform={`rotate(${generateRandomRotation(
				minRotation,
				maxRotation
			)})`}
		/>
	);
};
