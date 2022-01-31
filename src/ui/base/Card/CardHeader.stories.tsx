import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardHeaderComponent from "./CardHeader";

export default {
  title: "CardHeader",
  component: CardHeaderComponent,
} as ComponentMeta<typeof CardHeaderComponent>;

const Story: ComponentStory<typeof CardHeaderComponent> = (args) => (
  <CardHeaderComponent {...args} />
);

export const CardHeader = Story.bind({});

CardHeader.args = {
  title: "Header",
  description: "This is the description",
  action: <button>Action Button</button>,
};

CardHeader.storyName = "CardHeader";
