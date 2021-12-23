import classNames from "classnames";
import React, { ReactElement } from "react";
import tw, {
  display,
  flexDirection,
  height,
  gridTemplateColumns,
  width,
  margin,
  alignItems,
  justifyContent,
  textColor,
  fontWeight,
  textOpacity,
  borderWidth,
  backgroundColor,
  borderOpacity,
  borderColor,
  borderRadius,
  opacity,
  visibility,
  flexShrink,
} from "src/elf-tailwindcss-classnames";
import { Step, StepStatus } from "src/ui/base/Steps/step";

interface StepsProps {
  activeStepIndex: number | undefined;
  steps: Step[];
  className?: string;
}

export default function Steps({
  steps,
  activeStepIndex,
  className,
}: StepsProps): ReactElement {
  return (
    <div
      className={classNames(
        tw(display("flex"), flexDirection("flex-col")),
        className,
      )}
    >
      <div
        className={tw(
          display("grid"),
          gridTemplateColumns("grid-cols-3"),
          width("w-full"),
        )}
      >
        {steps.map((step, index) => {
          const prevStep = index > 0 ? steps[index - 1] : undefined;

          const isLeadingDividerActive = getIsLeadingDividerActive(
            prevStep?.status,
            step.status,
          );

          const isTrailingDividerActive = getIsTrailingDividerActive(
            step.status,
            index,
            activeStepIndex,
          );

          return (
            <div key={index}>
              <div
                className={tw(
                  height("h-10"),
                  display("flex"),
                  alignItems("items-center"),
                  justifyContent("justify-center"),
                  margin("mb-2"),
                )}
              >
                <Divider
                  isInvisible={index === 0}
                  isActive={isLeadingDividerActive}
                />
                <StepCount step={step} count={index + 1}></StepCount>
                <Divider
                  isInvisible={index === steps.length - 1}
                  isActive={isTrailingDividerActive}
                />
              </div>
              <div
                key={`divider=${index}`}
                className={tw(
                  display("flex"),
                  alignItems("items-center"),
                  justifyContent("justify-center"),
                  textColor("text-principalRoyalBlue"),
                  fontWeight("font-semibold"),
                  textOpacity({
                    "text-opacity-50": step.status === "upcoming",
                  }),
                )}
              >
                {step.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getIsTrailingDividerActive(
  status: StepStatus,
  index: number,
  activeStepIndex: number | undefined,
) {
  return (
    status === "complete" &&
    index !== activeStepIndex &&
    activeStepIndex !== undefined
  );
}

function getIsLeadingDividerActive(
  prevStepStatus: StepStatus | undefined,
  status: StepStatus,
) {
  return (
    (prevStepStatus === "complete" && status === "current") ||
    status === "complete"
  );
}

function StepCount({ step, count }: { step: Step; count: number }) {
  return (
    <div
      className={tw(
        flexShrink("shrink-0"),
        width("w-10"),
        height("h-10"),
        display("flex"),
        alignItems("items-center"),
        justifyContent("justify-center"),
        borderWidth("border-2"),
        borderColor("border-principalRoyalBlue"),
        borderRadius("rounded-full"),
        backgroundColor({
          "bg-principalRoyalBlue": step.status === "complete",
        }),
        borderOpacity({ "border-opacity-50": step.status === "upcoming" }),
      )}
    >
      <span
        className={tw(
          step.status === "complete"
            ? textColor("text-white")
            : textColor("text-principalRoyalBlue"),
          fontWeight("font-semibold"),
          textOpacity({ "text-opacity-50": step.status === "upcoming" }),
        )}
      >
        {count}
      </span>
    </div>
  );
}

function Divider(props: { isInvisible: boolean; isActive: boolean }) {
  return (
    <div
      className={tw(
        height("h-0.5"),
        width("w-full"),
        backgroundColor("bg-principalRoyalBlue"),
        opacity({ "opacity-50": !props.isActive }),
        visibility({ invisible: props.isInvisible }),
      )}
    />
  );
}
