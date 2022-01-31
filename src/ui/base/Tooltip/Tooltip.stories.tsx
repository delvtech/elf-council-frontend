import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TooltipComponent from "./Tooltip";

export default {
  title: "Tooltip",
  component: TooltipComponent,
} as ComponentMeta<typeof TooltipComponent>;

const Template: ComponentStory<typeof TooltipComponent> = (args) => (
  <TooltipComponent {...args} />
);

export const Tooltip = Template.bind({});

Tooltip.args = {
  children: <span>Hover Me</span>,
  content: "Tooltip Content",
};
