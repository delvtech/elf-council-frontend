import { ReactElement } from "react";
import tw, {
  width,
  height,
  borderWidth,
  margin,
  borderColor,
  borderStyle,
  borderRadius,
  animation,
} from "src/elf-tailwindcss-classnames";

export function Spinner(): ReactElement {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className={tw(
        width("w-8"),
        height("h-8"),
        borderWidth("border-2"),
        margin("m-auto"),
        borderColor("border-blue-400"),
        borderStyle("border-solid"),
        borderRadius("rounded-full"),
        animation("animate-spin"),
      )}
    ></div>
  );
}
