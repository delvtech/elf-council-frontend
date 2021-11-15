import React, { useState } from "react";
import { ToggleSwitch, ToggleSwitchButton } from "../components";

export default {
	title: "ToggleSwitch",
	component: ToggleSwitch,
};

const ControlledToggleSwitch = () => {
	const [value, setValue] = useState("");

	return (
		<>
			<ToggleSwitch
				value={value}
				onValueChange={(value) => setValue(value)}
			>
				<ToggleSwitchButton value="1">Option 1</ToggleSwitchButton>
				<ToggleSwitchButton value="2">Option 2</ToggleSwitchButton>
				<ToggleSwitchButton value="3">Option 3</ToggleSwitchButton>
			</ToggleSwitch>
			<br />
			{value && <p>Value: {value}</p>}
		</>
	);
};

const Template = (args) => (
	<ToggleSwitch {...args}>
		<ToggleSwitchButton>Option 1</ToggleSwitchButton>
		<ToggleSwitchButton>Option 2</ToggleSwitchButton>
		<ToggleSwitchButton>Option 3</ToggleSwitchButton>
	</ToggleSwitch>
);

const ControlledTemplate = (args) => <ControlledToggleSwitch {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {};
