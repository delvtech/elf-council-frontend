import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonComponent from "./Button";
import { ButtonVariant } from "src/ui/base/Button/styles";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Button",
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonComponent> = (args) => (
  <ButtonComponent {...args} />
);

export const Button = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Button.args = {
  children: <span>Click me</span>,
  variant: ButtonVariant.PRIMARY,
};
