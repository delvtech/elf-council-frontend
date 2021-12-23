import { ReactNode } from "react";

export interface Step {
  name: ReactNode;
  status: StepStatus;
}

export type StepStatus = "complete" | "current" | "upcoming";
