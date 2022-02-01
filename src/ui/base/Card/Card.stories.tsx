import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CardComponent, { CardVariant } from "./Card";

export default {
  title: "Card",
  component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

const Story: ComponentStory<typeof CardComponent> = (args) => (
  <CardComponent {...args} />
);

export const Card = Story.bind({});

Card.args = {
  children: <span>This is a card.</span>,
  className: "text-white w-96 h-96 flex justify-center items-center",
  variant: CardVariant.BLUE,
};
