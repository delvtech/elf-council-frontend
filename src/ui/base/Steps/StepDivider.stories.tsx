import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StepDivider as StepDividerComponent } from "./StepDivider";

export default {
  title: "Steps/StepDivider",
  component: StepDividerComponent,
} as ComponentMeta<typeof StepDividerComponent>;

const Story: ComponentStory<typeof StepDividerComponent> = () => (
  <StepDividerComponent />
);

export const StepDivider = Story.bind({});

StepDivider.storyName = "StepDivider";
