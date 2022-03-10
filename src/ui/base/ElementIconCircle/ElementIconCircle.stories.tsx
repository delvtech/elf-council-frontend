import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ElementIconCircle as ElementIconCircleComponent,
  IconSize,
} from "./ElementIconCircle";

export default {
  title: "Icons/ElementIconCircle",
  component: ElementIconCircleComponent,
} as ComponentMeta<typeof ElementIconCircleComponent>;

const Story: ComponentStory<typeof ElementIconCircleComponent> = (args) => (
  <ElementIconCircleComponent {...args} />
);

export const ElementIconCircle = Story.bind({});

ElementIconCircle.args = {
  size: IconSize.MEDIUM,
};

ElementIconCircle.storyName = "ElementIconCircle";
