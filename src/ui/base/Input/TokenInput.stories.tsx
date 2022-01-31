import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TokenInputComponent from "./TokenInput";

export default {
  title: "Inputs/TokenInput",
  component: TokenInputComponent,
} as ComponentMeta<typeof TokenInputComponent>;

const Story: ComponentStory<typeof TokenInputComponent> = (args) => (
  <TokenInputComponent {...args} />
);

export const TokenInput = Story.bind({});

TokenInput.args = {
  id: "test-id",
  name: "Balance",
  placeholder: "Enter Balance Here",
  screenReaderLabel: "Enter Balance",
  showMaxButton: true,
  maxValue: "1000000",
};

TokenInput.storyName = "TokenInput";
