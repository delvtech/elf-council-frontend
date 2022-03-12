import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AnchorButtonComponent from "./AnchorButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import ElementUrls from "src/elf/urls";

export default {
  title: "Buttons/AnchorButton",
  component: AnchorButtonComponent,
} as ComponentMeta<typeof AnchorButtonComponent>;

const Template: ComponentStory<typeof AnchorButtonComponent> = (args) => (
  <AnchorButtonComponent {...args} />
);

export const AnchorButton = Template.bind({});
AnchorButton.args = {
  children: <span>Click me</span>,
  variant: ButtonVariant.PRIMARY,
  href: ElementUrls.CORE_LANDING,
  target: "_blank",
};

AnchorButton.storyName = "AnchorButton";
