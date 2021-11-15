import { Link } from "../components";

export default {
	title: "Link",
	component: Link,
};

const Template = (args) => (
	<Link href="#" {...args}>
		Click Me
	</Link>
);

const ExternalLinkTemplate = (args) => (
	<Link href="https://www.google.com" externalLink {...args}>
		Click Me
	</Link>
);

export const Default = Template.bind({});
Default.args = {};

export const ExternalLink = ExternalLinkTemplate.bind({});
ExternalLink.args = {};

export const Active = Template.bind({});
Active.args = {
	active: true,
};

export const Banner = Template.bind({});
Banner.args = {
	bannerLink: true,
};
