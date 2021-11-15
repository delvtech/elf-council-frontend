import { useState } from "react";
import { Button, AlertBanner, Link } from "../components";

export default {
	title: "AlertBanner",
	component: AlertBanner,
};

const DefaultTemplateComponent = () => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Open Alert Banner</Button>
			<AlertBanner open={open} onClose={() => setOpen(false)}>
				Banner Text
			</AlertBanner>
		</div>
	);
};

const BannerLinkTemplateComponent = () => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Open Alert Banner</Button>
			<AlertBanner open={open} onClose={() => setOpen(false)}>
				Some Banner Text with{" "}
				<Link
					href="https://www.google.com/"
					bannerLink
					externalLink
					referrerPolicy="no-referrer"
				>
					a link to some page
				</Link>
			</AlertBanner>
		</div>
	);
};

const Template = (args) => <DefaultTemplateComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const BannerLink = BannerLinkTemplateComponent.bind({});
BannerLink.args = {};
