export const generateRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export const generateRandomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomRotation = (min: number, max: number) => {
	const sign01 = Math.random() < 0.5 ? -1 : 1;
	const sign02 = Math.random() < 0.5 ? -1 : 1;
	const sign03 = Math.random() < 0.5 ? -1 : 1;

	const rotation = {
		x: sign01 * generateRandomInt(min, max),
		y: sign02 * generateRandomInt(min, max),
		z: sign03 * generateRandomInt(min, max),
	};
	return `${rotation.x} ${rotation.y} ${rotation.z}`;
};

export const generateUid = () => {
	return `${Date.now().toString(36)}-${Math.random()
		.toString(36)
		.substr(2)}-${Math.random().toString(36).substr(2)}`;
};
