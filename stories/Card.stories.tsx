import { Card, CardVariant, Text } from "../components";

export default {
	title: "Card",
	component: Card,
};

const Template = (args) => (
	<Card {...args}>
		<Text>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cum
			consequuntur doloremque libero quae. Debitis enim voluptates eveniet
			sit reiciendis corrupti, architecto illum minus veniam cum dolore,
			quas facere quaerat.
		</Text>
	</Card>
);

const TemplatePrimary = (args) => (
	<Card {...args}>
		<Text className="text-white" ignoreColor>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cum
			consequuntur doloremque libero quae. Debitis enim voluptates eveniet
			sit reiciendis corrupti, architecto illum minus veniam cum dolore,
			quas facere quaerat.
		</Text>
	</Card>
);

export const Default = Template.bind({});
Default.args = {
	variant: CardVariant.Default,
};

export const Primary = TemplatePrimary.bind({});
Primary.args = {
	variant: CardVariant.Primary,
};

export const Outlined = Template.bind({});
Outlined.args = {
	variant: CardVariant.Outlined,
};

export const Shadow = Template.bind({});
Shadow.args = {
	variant: CardVariant.Default,
	shadow: true,
};
