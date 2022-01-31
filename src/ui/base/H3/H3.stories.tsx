import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import H3Component from "./H3";

export default {
  title: "Section Headers/H3",
  component: H3Component,
} as ComponentMeta<typeof H3Component>;

const Story: ComponentStory<typeof H3Component> = (args) => (
  <H3Component {...args} />
);

export const H3 = Story.bind({});

H3.args = {
  children: <span>H3 Header</span>,
};

H3.storyName = "H3";
