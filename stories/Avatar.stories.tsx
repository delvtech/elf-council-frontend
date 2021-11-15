import { Avatar } from "../components";

export default {
	title: "Avatar",
	component: Avatar,
};

const Template = (args) => (
	<div className="grid grid-cols-6 gap-x-2 gap-y-20 relative z-10 justify-items-center items-center my-4">
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
		<Avatar {...args} />
	</div>
);

export const Default = Template.bind({});
Default.args = {};
