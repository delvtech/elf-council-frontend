import classNames from "classnames";
import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import { Step } from "src/ui/base/Card/Steps2/step";

interface StepsProps {
  steps: Step[];
  className?: string;
}

export default function Steps2({ steps, className }: StepsProps): ReactElement {
  return (
    <div className={classNames(tw("flex", "flex-col"), className)}>
      <div className={tw("grid", "h-10", "grid-cols-3", "w-full", "mb-2")}>
        {steps.map((step, index) => {
          const prevStep = index > 0 ? steps[index - 1] : undefined;
          return (
            <div
              key={index}
              className={tw("h-10", "flex", "items-center", "justify-center")}
            >
              <Divider
                isInvisible={index === 0}
                isActive={
                  (prevStep?.status === "complete" &&
                    step.status === "current") ||
                  step.status === "complete"
                }
              />
              <StepCount step={step} count={index + 1}></StepCount>
              <Divider
                isInvisible={index === steps.length - 1}
                isActive={step.status === "complete"}
              />
            </div>
          );
        })}
      </div>

      {/* Text below */}
      <div className={tw("grid", "grid-cols-3", "w-full", "items-center")}>
        {steps.map((step, index) => (
          <div
            key={`divider=${index}`}
            className={tw(
              "flex",
              "items-center",
              "justify-center",
              "text-principalRoyalBlue",
              "font-semibold",
              { "text-opacity-50": step.status === "upcoming" }
            )}
          >
            {step.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCount({ step, count }: { step: Step; count: number }) {
  return (
    <div
      className={tw(
        "w-10",
        "h-10",
        "flex",
        "flex-shrink-0",
        "items-center",
        "justify-center",
        "border-2",
        {
          "bg-principalRoyalBlue": step.status === "complete",
          "border-opacity-50": step.status === "upcoming",
        },
        "border-principalRoyalBlue",
        "rounded-full"
      )}
    >
      <span
        className={tw(
          step.status === "complete" ? "text-white" : "text-principalRoyalBlue",
          "font-semibold",
          { "text-opacity-50": step.status === "upcoming" }
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
      className={tw("h-0.5", "w-full", "bg-principalRoyalBlue", {
        "opacity-50": !props.isActive,
        invisible: props.isInvisible,
      })}
    />
  );
}
