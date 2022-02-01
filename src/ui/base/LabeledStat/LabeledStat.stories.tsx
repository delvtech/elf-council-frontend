import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LabeledStat as LabeledStatComponent } from "./LabeledStat";

export default {
  title: "Labels/LabeledStat",
  component: LabeledStatComponent,
} as ComponentMeta<typeof LabeledStatComponent>;

const Story: ComponentStory<typeof LabeledStatComponent> = (args) => (
  <LabeledStatComponent {...args} />
);

export const LabeledStat = Story.bind({});

LabeledStat.args = {
  data: "1000000",
  topLabel: "Top Label",
  bottomLabel: "Bottom Label",
  whiteText: false,
};

LabeledStat.storyName = "LabeledStat";
