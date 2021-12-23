import { ReactElement, ReactNode } from "react";
import tw, {
  height,
  display,
  alignItems,
  justifyContent,
  margin,
  textColor,
  fontWeight,
  textOpacity,
  flexShrink,
  width,
  borderWidth,
  borderColor,
  borderRadius,
  backgroundColor,
  borderOpacity,
  flex,
  textAlign,
} from "src/elf-tailwindcss-classnames";

export interface Step {
  name: ReactNode;
  status: StepStatus;
}

export enum StepStatus {
  COMPLETE = "complete",
  CURRENT = "current",
  UPCOMING = "upcoming",
}

interface StepItemProps {
  stepLabel: string;
  status: StepStatus;
  children: string;
}

export function StepItem({
  stepLabel,
  status,
  children,
}: StepItemProps): ReactElement {
  return (
    <div className={tw(flex("flex-1"))}>
      <div
        className={tw(
          height("h-10"),
          display("flex"),
          alignItems("items-center"),
          justifyContent("justify-center"),
          margin("mb-2"),
        )}
      >
        <StepLabel status={status} label={stepLabel}></StepLabel>
      </div>
      <div
        className={tw(
          display("flex"),
          alignItems("items-center"),
          justifyContent("justify-center"),
          textAlign("text-center"),
          textColor("text-principalRoyalBlue"),
          fontWeight("font-semibold"),
          textOpacity({
            "text-opacity-50": status === "upcoming",
          }),
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface StepLabelProps {
  status: StepStatus;
  label: string;
}

function StepLabel({ status, label }: StepLabelProps) {
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
          "bg-principalRoyalBlue": status === "complete",
        }),
        borderOpacity({ "border-opacity-50": status === "upcoming" }),
      )}
    >
      <span
        className={tw(
          status === "complete"
            ? textColor("text-white")
            : textColor("text-principalRoyalBlue"),
          fontWeight("font-semibold"),
          textOpacity({ "text-opacity-50": status === "upcoming" }),
        )}
      >
        {label}
      </span>
    </div>
  );
}
