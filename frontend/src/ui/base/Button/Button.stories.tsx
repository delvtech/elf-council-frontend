import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";
import { ButtonVariant } from "src/ui/base/Button/styles";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: <span>Click me</span>,
  variant: ButtonVariant.PRIMARY,
};
