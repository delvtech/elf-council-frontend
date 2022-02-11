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
      <div className="mb-2 flex h-10 items-center justify-center">
        <StepLabel status={status} label={stepLabel}></StepLabel>
      </div>
      <div
        className={classNames(
          "flex items-center justify-center text-center font-semibold text-principalRoyalBlue",
          {
            "text-opacity-50": status === StepStatus.UPCOMING,
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

function StepLabel({ label, status }: StepLabelProps) {
  return (
    <div
      className={classNames(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-principalRoyalBlue",
        {
          "bg-principalRoyalBlue": status === StepStatus.COMPLETE,
          "border-opacity-50": status === StepStatus.UPCOMING,
        },
      )}
    >
      <span
        className={classNames(
          "font-semibold",
          status === "complete" ? "text-white" : "text-principalRoyalBlue",
          { "text-opacity-50": status === StepStatus.UPCOMING },
        )}
      >
        {label}
      </span>
    </div>
  );
}
