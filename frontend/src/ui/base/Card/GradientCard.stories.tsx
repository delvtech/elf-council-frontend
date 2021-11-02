import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import GradientCardComponent from "./GradientCard";
import tw from "src/elf-tailwindcss-classnames";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "GradientCard",
  component: GradientCardComponent,
} as ComponentMeta<typeof GradientCardComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Story: ComponentStory<typeof GradientCardComponent> = (args) => (
  <GradientCardComponent {...args} />
);

export const GradientCard = Story.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
GradientCard.args = {
  children: <span>This is a gradient card.</span>,
  className: tw(
    "text-white",
    "w-96",
    "h-96",
    "flex",
    "justify-center",
    "items-center"
  ),
};
