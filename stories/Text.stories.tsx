import { Text, TextVariant } from "../components";

export default {
	title: "Text",
	component: Text,
};

const Template = (args) => (
	<Text {...args}>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
		numquam quidem voluptate voluptatibus rem sint, suscipit neque
		voluptatum similique consectetur laudantium fugiat dolorum, illo libero
		eveniet aspernatur culpa quis rerum.
	</Text>
);

const ShortTextTemplate = (args) => <Text {...args}>Short Text</Text>;

export const DefaultBody = Template.bind({});
DefaultBody.args = {
	variant: TextVariant.Body,
};

export const Header = ShortTextTemplate.bind({});
Header.args = {
	variant: TextVariant.Header,
};

export const SecondaryHeader = ShortTextTemplate.bind({});
SecondaryHeader.args = {
	variant: TextVariant.SecondaryHeader,
};

export const SubHeader = ShortTextTemplate.bind({});
SubHeader.args = {
	variant: TextVariant.SubHeader,
};

export const Navigation = ShortTextTemplate.bind({});
Navigation.args = {
	variant: TextVariant.Navigation,
};

export const PastNavigation = ShortTextTemplate.bind({});
PastNavigation.args = {
	variant: TextVariant.PastNavigation,
};

export const ActiveNavigation = ShortTextTemplate.bind({});
ActiveNavigation.args = {
	variant: TextVariant.ActiveNavigation,
};
