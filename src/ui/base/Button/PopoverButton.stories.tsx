import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PopoverButtonComponent from "./PopoverButton";
import { ButtonVariant } from "src/ui/base/Button/styles";

export default {
  title: "Buttons/PopoverButton",
  component: PopoverButtonComponent,
} as ComponentMeta<typeof PopoverButtonComponent>;

const Template: ComponentStory<typeof PopoverButtonComponent> = (args) => (
  <PopoverButtonComponent {...args} />
);

export const PopoverButton = Template.bind({});

PopoverButton.args = {
  children: <span>Click me</span>,
  variant: ButtonVariant.PRIMARY,
  popover: <div>Popover</div>,
};

PopoverButton.storyName = "PopoverButton";
