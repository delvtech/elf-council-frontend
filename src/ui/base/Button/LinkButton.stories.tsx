import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import LinkButtonComponent from "./LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";

export default {
  title: "Buttons/LinkButton",
  component: LinkButtonComponent,
} as ComponentMeta<typeof LinkButtonComponent>;

const Template: ComponentStory<typeof LinkButtonComponent> = (args) => (
  <LinkButtonComponent {...args} link="/">
    <span>Click me</span>
  </LinkButtonComponent>
);

export const LinkButton = Template.bind({});

LinkButton.args = {
  variant: ButtonVariant.PRIMARY,
};

LinkButton.storyName = "LinkButton";
