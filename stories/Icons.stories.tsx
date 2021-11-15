import { Icons } from "../components";

export default {
	title: "Icons",
	component: Icons,
};

const CollectionTemplate = (args) => (
	<>
		<div className="bg-black fixed top-0 left-0 right-0 bottom-0" />
		<div className="grid grid-cols-6 gap-x-2 gap-y-20 relative z-10 justify-items-center items-center my-4">
			<Icons.ArrowForward />
			<Icons.Close />
			<Icons.Copy />
			<Icons.DownArrow />
			<Icons.HourGlass />
			<Icons.HowToVote />
			<Icons.OpenInNewTab />
			<Icons.Twitter />
			<Icons.Help />
			<Icons.LocalGas />
			<Icons.Refresh />
			<Icons.DoneAll />
			<Icons.Done />
			<Icons.Warning />
		</div>

		<div className="mt-20 relative z-10">
			<p className="text-white text-center">
				The following icons are stored as images
			</p>
			<div className="grid grid-cols-2 gap-4 justify-items-center items-center">
				<img src="./assets/elfi-token.svg" />
				<img src="./assets/council-logo.png" />
			</div>
		</div>
	</>
);

const CustomConfigTemplate = (args) => (
	<>
		<div className="bg-black fixed top-0 left-0 right-0 bottom-0" />
		<div className="grid grid-cols-3 gap-3 relative z-10 justify-items-center items-center my-4">
			<Icons.ArrowForward fill={"red"} />
			<Icons.Copy style={{ height: "40px", width: "40px" }} />
			<Icons.DoneAll className="opacity-30" />
		</div>
	</>
);

export const Collection = CollectionTemplate.bind({});
Collection.args = {};

export const CustomConfiguration = CustomConfigTemplate.bind({});
CustomConfiguration.args = {};
