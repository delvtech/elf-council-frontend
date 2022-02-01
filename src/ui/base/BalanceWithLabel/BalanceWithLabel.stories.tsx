import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BalanceWithLabel as BalanceWithLabelComponent } from "./BalanceWithLabel";

export default {
  title: "Labels/BalanceWithLabel",
  component: BalanceWithLabelComponent,
} as ComponentMeta<typeof BalanceWithLabelComponent>;

const Template: ComponentStory<typeof BalanceWithLabelComponent> = (args) => (
  <BalanceWithLabelComponent {...args} />
);

export const BalanceWithLabel = Template.bind({});
BalanceWithLabel.args = {
  label: "Balance",
  balance: "5000",
  tooltipText: "I am a tooltip text",
};

BalanceWithLabel.parameters = {
  backgrounds: {
    default: "principalRoyalBlue",
    values: [{ name: "principalRoyalBlue", value: "#005EBE" }],
  },
};

BalanceWithLabel.storyName = "BalanceWithLabel";
