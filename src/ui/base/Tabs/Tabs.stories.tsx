import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TabsComponent from "./Tabs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tabs",
  component: TabsComponent,
} as ComponentMeta<typeof TabsComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TabsStory: ComponentStory<typeof TabsComponent> = (args) => (
  <TabsComponent {...args} />
);

const onChange = () => {};
export const Tabs = TabsStory.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Tabs.args = {
  tabs: [
    { name: "First", current: true, onTabClick: onChange },
    { name: "Second", current: false, onTabClick: onChange },
    { name: "Third", current: false, onTabClick: onChange },
  ],
  "aria-label": "Storybook tabs label",
};
