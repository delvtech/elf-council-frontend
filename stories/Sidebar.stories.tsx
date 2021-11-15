import { useState } from "react";
import { Link, Sidebar } from "../components";

export default {
	title: "Sidebar",
	component: Sidebar,
};

const SidebarTemplate = (args) => {
	const [index, setIndex] = useState(0);

	return (
		<Sidebar {...args}>
			<Link
				href="#"
				className="my-6 w-max"
				onClick={() => setIndex(0)}
				active={index === 0}
			>
				Link 1
			</Link>
			<Link
				href="#"
				className="my-6 w-max"
				onClick={() => setIndex(1)}
				active={index === 1}
			>
				Link 2
			</Link>
			<Link
				href="#"
				className="my-6 w-max"
				onClick={() => setIndex(2)}
				active={index === 2}
			>
				Link 3
			</Link>
			<Link
				href="#"
				className="my-6 w-max"
				onClick={() => setIndex(3)}
				active={index === 3}
			>
				Another Link
			</Link>
		</Sidebar>
	);
};

const Template = (args) => <SidebarTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {};
