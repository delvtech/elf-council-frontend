import { Button } from "../components";

export default {
	title: "Button",
	component: Button,
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {
	fullWidth: false,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
	fullWidth: true,
};

export const Gradient = Template.bind({});
Gradient.args = {
	gradient: true,
};

export const ElfiToken = Template.bind({});
ElfiToken.args = {
	tokenButton: true,
};

export const WhiteButton = Template.bind({});
WhiteButton.args = {
	whiteButton: true,
};
