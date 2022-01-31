import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Spinner as SpinnerComponent } from "./Spinner";

export default {
  title: "Spinner",
  component: SpinnerComponent,
} as ComponentMeta<typeof SpinnerComponent>;

const Story: ComponentStory<typeof SpinnerComponent> = () => (
  <SpinnerComponent />
);

export const Spinner = Story.bind({});
