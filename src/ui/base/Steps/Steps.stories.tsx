import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StepsComponent from "./Steps";
import { StepItem as StepItemComponent, StepStatus } from "./StepItem";
import { StepDivider as StepDividerComponent } from "./StepDivider";

export default {
  title: "Steps/Steps",
  component: StepsComponent,
  subcomponents: { StepItemComponent, StepDividerComponent },
} as ComponentMeta<typeof StepsComponent>;

const Story: ComponentStory<typeof StepsComponent> = (args) => (
  <StepsComponent {...args}>
    <StepItemComponent stepLabel="1" status={StepStatus.COMPLETE}>
      Step One
    </StepItemComponent>

    <StepDividerComponent />

    <StepItemComponent stepLabel="2" status={StepStatus.CURRENT}>
      Step Two
    </StepItemComponent>

    <StepDividerComponent />

    <StepItemComponent stepLabel="3" status={StepStatus.UPCOMING}>
      Step Three
    </StepItemComponent>
  </StepsComponent>
);

export const Steps = Story.bind({});

Steps.args = {};
