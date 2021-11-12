import { StatusButton, EStatus } from "../components";

export default {
	title: "StatusButton",
	component: StatusButton,
};

const Template = (args) => <StatusButton {...args} />;

export const Default = Template.bind({});
Default.args = {
	status: EStatus.Normal,
};

export const Success = Template.bind({});
Success.args = {
	status: EStatus.Success,
};

export const Fail = Template.bind({});
Fail.args = {
	status: EStatus.Failed,
};

export const Queued = Template.bind({});
Queued.args = {
	status: EStatus.Queued,
};
