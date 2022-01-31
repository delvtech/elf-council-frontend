import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProgressBar as ProgressBarComponent } from "./ProgressBar";

export default {
  title: "ProgressBar",
  component: ProgressBarComponent,
} as ComponentMeta<typeof ProgressBarComponent>;

const Story: ComponentStory<typeof ProgressBarComponent> = (args) => (
  <ProgressBarComponent {...args} />
);

export const ProgressBar = Story.bind({});

ProgressBar.args = {
  progress: 0.25,
  enableBar: true,
};
