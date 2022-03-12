import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ElementLogo as ElementLogoComponent } from "./ElementLogo";

export default {
  title: "Icons/ElementLogo",
  component: ElementLogoComponent,
} as ComponentMeta<typeof ElementLogoComponent>;

const Story: ComponentStory<typeof ElementLogoComponent> = (args) => (
  <ElementLogoComponent {...args} />
);

export const ElementLogo = Story.bind({});

ElementLogo.args = {
  height: "50px",
};

ElementLogo.storyName = "ElementLogo";
