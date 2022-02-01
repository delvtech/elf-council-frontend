import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DialogComponent from "./Dialog";

export default {
  title: "Dialog",
  component: DialogComponent,
} as ComponentMeta<typeof DialogComponent>;

const Story: ComponentStory<typeof DialogComponent> = (args) => (
  <DialogComponent {...args} />
);

export const Dialog = Story.bind({});

Dialog.args = {
  children: <span>This is a dialog.</span>,
  isOpen: true,
};
