import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import H1Component from "./H1";

export default {
  title: "Section Headers/H1",
  component: H1Component,
} as ComponentMeta<typeof H1Component>;

const Story: ComponentStory<typeof H1Component> = (args) => (
  <H1Component {...args} />
);

export const H1 = Story.bind({});

H1.args = {
  children: <span>H1 Header</span>,
};

H1.storyName = "H1";
