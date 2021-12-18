import { ReactNode } from "react";

export interface Step {
  name: ReactNode;
  onClick?: () => void;
  status: StepStatus;
}

export type StepStatus = "complete" | "current" | "upcoming";
