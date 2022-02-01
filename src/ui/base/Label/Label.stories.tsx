import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Label as LabelComponent } from "./Label";

export default {
  title: "Label",
  component: LabelComponent,
} as ComponentMeta<typeof LabelComponent>;

const Story: ComponentStory<typeof LabelComponent> = (args) => (
  <LabelComponent {...args} />
);

export const Label = Story.bind({});

Label.args = {
  children: <span>Label</span>,
  small: true,
};
