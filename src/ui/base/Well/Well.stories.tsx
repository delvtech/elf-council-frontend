import React, { ReactNode } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import WellComponent from "./Well";

export default {
  title: "Well",
  component: WellComponent,
} as ComponentMeta<typeof WellComponent>;

const Template: ComponentStory<typeof WellComponent> = (args) => (
  <WellComponent {...args} />
);

export const Well = Template.bind({});

Well.args = {
  children: <span>Well Content</span>,
};
