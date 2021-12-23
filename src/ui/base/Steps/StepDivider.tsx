import { ReactElement } from "react";
import tw, {
  height,
  width,
  backgroundColor,
  opacity,
  margin,
  display,
} from "src/elf-tailwindcss-classnames";

export function StepDivider(): ReactElement {
  return (
    <div
      className={tw(
        margin(
          // lines up the divider with the StepItem circle label (this works
          // because the StepItem circle label element is h-10)
          "mt-5",
        ),
        height("h-0.5"),
        display("flex"),
        width("w-24"),
        backgroundColor("bg-principalRoyalBlue"),
        opacity("opacity-50"),
      )}
    />
  );
}
