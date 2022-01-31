import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextInputComponent from "./TextInput";

export default {
  title: "Inputs/TextInput",
  component: TextInputComponent,
} as ComponentMeta<typeof TextInputComponent>;

const Story: ComponentStory<typeof TextInputComponent> = (args) => (
  <TextInputComponent {...args} />
);

export const TextInput = Story.bind({});

TextInput.args = {
  id: "test-id",
  name: "Address",
  placeholder: "Enter Address Here",
  screenReaderLabel: "Enter Address",
};

TextInput.storyName = "TextInput";
