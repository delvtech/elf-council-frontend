import { ReactElement, ReactNode } from "react";
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
      <div className="flex items-center justify-center h-10 mb-2">
        <StepLabel status={status} label={stepLabel}></StepLabel>
      </div>
      <div
        className={classNames(
          "flex items-center justify-center text-center text-principalRoyalBlue font-semibold",
          {
            "text-opacity-50": status === "upcoming",
          },
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
      className={classNames(
        "shrink-0  w-10 h-10 flex items-center justify-center border-2 border-principalRoyalBlue rounded-full",
        {
          "bg-principalRoyalBlue": status === "complete",
          "border-opacity-50": status === "upcoming",
        },
      )}
    >
      <span
        className={classNames(
          "font-semibold",
          status === "complete" ? "text-white" : "text-principalRoyalBlue",
          { "text-opacity-50": status === "upcoming" },
        )}
      >
        {label}
      </span>
    </div>
  );
}
