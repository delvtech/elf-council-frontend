import { Button, Indicator } from "../components";

export default {
	title: "Indicator",
	component: Indicator,
};

const Template = (args) => (
	<Indicator {...args}>
		<Button gradientButton>Click Me</Button>
	</Indicator>
);

const AccentTemplate = (args) => (
	<Indicator {...args}>
		<Button>Click Me</Button>
	</Indicator>
);

export const Default = Template.bind({});
Default.args = {
	isActive: true,
};

export const Accent = AccentTemplate.bind({});
Accent.args = {
	isActive: true,
	accent: true,
};
