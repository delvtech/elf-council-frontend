import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tag } from "./Tag";
import { Intent } from "src/ui/base/Intent";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: "in 2 days",
  intent: Intent.SUCCESS,
};
