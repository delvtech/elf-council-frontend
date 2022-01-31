import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OutlinedSectionComponent from "./OutlinedSection";

export default {
  title: "OutlinedSection",
  component: OutlinedSectionComponent,
} as ComponentMeta<typeof OutlinedSectionComponent>;

const Story: ComponentStory<typeof OutlinedSectionComponent> = (args) => (
  <OutlinedSectionComponent {...args} />
);

export const OutlinedSection = Story.bind({});

OutlinedSection.args = {
  children: <span>Outlined Section Content</span>,
};

OutlinedSection.storyName = "OutlinedSection";
