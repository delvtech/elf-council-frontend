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
  textAlign,
} from "src/elf-tailwindcss-classnames";
import Link, { LinkProps } from "next/link";
import classNames from "classnames";

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
  href?: string | URL;
}

export function StepItem({
  stepLabel,
  status,
  children,
  href,
}: StepItemProps): ReactElement {
  const Container = href ? StepItemAsLink : "div";
  return (
    <Container className="flex-1" href={href as string | URL}>
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
    </Container>
  );
}

interface StepItemAsLinkProps extends LinkProps {
  children: ReactNode;
  className: string;
}

function StepItemAsLink({
  href,
  children,
  className,
  ...props
}: StepItemAsLinkProps): ReactElement {
  return (
    <Link href={href}>
      <a {...props} className={classNames("block", className)}>
        {children}
      </a>
    </Link>
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
