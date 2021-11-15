import React, { useState } from "react";
import { TransactionAlerts, TransactionAlertsVariant } from "../components";

export default {
	title: "TransactionAlerts",
	component: TransactionAlerts,
};

const TransactionAlertsTemplate = (args) => {
	const [clicked, setClicked] = useState(false);

	return (
		<>
			<TransactionAlerts onClick={() => setClicked(true)} {...args} />
			{clicked && (
				<>
					<br />
					<p>Button Clicked!</p>
				</>
			)}
		</>
	);
};

const Template = (args) => <TransactionAlertsTemplate {...args} />;

export const ApproveTransaction = Template.bind({});
ApproveTransaction.args = {
	variant: TransactionAlertsVariant.ApproveTransaction,
};

export const TransactionApproved = Template.bind({});
TransactionApproved.args = {
	variant: TransactionAlertsVariant.TransactionApproved,
};

export const TransactionRejected = Template.bind({});
TransactionRejected.args = {
	variant: TransactionAlertsVariant.TransactionRejected,
};

export const ApproveStaking = Template.bind({});
ApproveStaking.args = {
	variant: TransactionAlertsVariant.ApproveStaking,
};

export const StakingApproved = Template.bind({});
StakingApproved.args = {
	variant: TransactionAlertsVariant.StakingApproved,
};
