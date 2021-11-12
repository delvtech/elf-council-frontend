import { Link } from "../components";

export default {
	title: "Link",
	component: Link,
};

const Template = (args) => <Link {...args}>Click Me</Link>;

export const Default = Template.bind({});
Default.args = {};

export const Banner = Template.bind({});
Banner.args = {
	bannerLink: true,
};
