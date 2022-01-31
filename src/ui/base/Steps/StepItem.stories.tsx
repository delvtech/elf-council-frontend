import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StepItem as StepItemComponent, StepStatus } from "./StepItem";

export default {
  title: "Steps/Label",
  component: StepItemComponent,
} as ComponentMeta<typeof StepItemComponent>;

const Story: ComponentStory<typeof StepItemComponent> = (args) => (
  <StepItemComponent {...args} />
);

export const Label = Story.bind({});

Label.args = {
  children: "Step One",
  stepLabel: "1",
  status: StepStatus.CURRENT,
};
