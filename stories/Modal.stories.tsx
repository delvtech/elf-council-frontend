import { useState } from "react";
import { Button, Modal } from "../components";

export default {
	title: "Modal",
	component: Modal,
};

const loremText = `
Lorem ipsum dolor sit, amet consectetur adipisicing elit.
Reiciendis debitis corporis ea? Facere aut dicta maiores
consequatur nam doloribus nulla consectetur quasi cupiditate
quo, dolor minus ipsum natus quis nemo! Lorem ipsum dolor sit,
amet consectetur adipisicing elit. Reiciendis debitis corporis
ea? Facere aut dicta maiores consequatur nam doloribus nulla
consectetur quasi cupiditate quo, dolor minus ipsum natus quis
nemo! 
`;

const TemplateComponent = ({ text }: { text: string }) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Open Modal</Button>
			<Modal open={open} onClose={() => setOpen(false)}>
				{text}
			</Modal>
		</div>
	);
};

const Template = (args) => <TemplateComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
	text: loremText,
};

export const LongText = Template.bind({});
LongText.args = {
	text: loremText.repeat(10),
};
