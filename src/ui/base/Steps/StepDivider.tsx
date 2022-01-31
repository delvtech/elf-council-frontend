import { ReactElement } from "react";

export function StepDivider(): ReactElement {
  return (
    <div
      // mt-5: lines up the divider with the StepItem circle label (this works
      // because the StepItem circle label element is h-10)
      className="mt-5 h-0.5 flex w-24 bg-principalRoyalBlue opacity-50"
    />
  );
}
