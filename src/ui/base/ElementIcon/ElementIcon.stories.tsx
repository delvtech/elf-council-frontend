import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ElementIcon as ElementIconComponent, IconSize } from "./ElementIcon";

export default {
  title: "Icons/ElementIcon",
  component: ElementIconComponent,
} as ComponentMeta<typeof ElementIconComponent>;

const Story: ComponentStory<typeof ElementIconComponent> = (args) => (
  <ElementIconComponent {...args} />
);

export const ElementIcon = Story.bind({});

ElementIcon.args = {
  size: IconSize.MEDIUM,
};

ElementIcon.storyName = "ElementIcon";
