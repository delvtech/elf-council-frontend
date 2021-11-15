import { useEffect, useState } from "react";
import { DropDown, DropDownItem, DropDownVariant } from "../components";

export default {
	title: "DropDown",
	component: DropDown,
};

const GradientTemplateComponent = (args) => {
	const [currentSelectionId, setCurrentSelectionId] = useState(null);

	return (
		<>
			<DropDown
				variant={DropDownVariant.Gradient}
				title="Vote"
				onValueChange={(value) => setCurrentSelectionId(value)}
				{...args}
			>
				<DropDownItem icon="HowToVote" value="For">
					For
				</DropDownItem>
				<DropDownItem icon="HowToVote" value="Abstain">
					Abstain
				</DropDownItem>
				<DropDownItem icon="HowToVote" value="Against">
					Against
				</DropDownItem>
				<DropDownItem icon="OpenInNewTab" value="Delegate">
					Delegate
				</DropDownItem>
			</DropDown>

			{currentSelectionId && (
				<>
					<br />
					<p>You Clicked: {currentSelectionId}</p>
				</>
			)}
		</>
	);
};

const TransparentTemplateComponent = (args) => {
	const [currentGas, setCurrentGas] = useState("201");

	return (
		<>
			<DropDown
				variant={DropDownVariant.Transparent}
				title={currentGas}
				value={currentGas}
				onValueChange={(value) => setCurrentGas(value)}
				icon="LocalGas"
				{...args}
			>
				<DropDownItem value={"181"}>Standard (181 Gwei)</DropDownItem>
				<DropDownItem value={"201"}>Fast (201 Gwei)</DropDownItem>
				<DropDownItem value={"221"}>Instant (221 Gwei)</DropDownItem>
			</DropDown>

			<br />
			<p>Current Gas: {currentGas} Gwei</p>
		</>
	);
};

const Template = (args) => <GradientTemplateComponent {...args} />;

export const Gradient = Template.bind({});
Gradient.args = {};

export const Transparent = TransparentTemplateComponent.bind({});
Transparent.args = {};
