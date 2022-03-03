import React, { Fragment } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TabsComponent, { Tab } from "./Tabs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tabs",
  component: TabsComponent,
} as ComponentMeta<typeof TabsComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TabsStory: ComponentStory<typeof TabsComponent> = (args) => (
  <TabsComponent {...args} />
);

export const Tabs = TabsStory.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Tabs.args = {
  "aria-label": "Storybook tabs label",
  children: (
    <Fragment>
      <Tab name="tab 1" current first />
      <Tab name="tab 2" current last />
    </Fragment>
  ),
};
