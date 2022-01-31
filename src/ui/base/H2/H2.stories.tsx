import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import H2Component from "./H2";

export default {
  title: "Section Headers/H2",
  component: H2Component,
} as ComponentMeta<typeof H2Component>;

const Story: ComponentStory<typeof H2Component> = (args) => (
  <H2Component {...args} />
);

export const H2 = Story.bind({});

H2.args = {
  children: <span>H2 Header</span>,
};

H2.storyName = "H2";
