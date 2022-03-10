import { JSXElementConstructor, ReactElement } from "react";
import { InheritableElementProps, PropsOf } from "src/@types/helper";
import { SVGComponentProps } from "src/ui/svg/types";
import SVG from "./elementIcon.svg";
import SVGLight from "./elementIcon--light.svg";

export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum IconVariant {
  DARK = "dark",
  LIGHT = "light",
}

interface ElementIconProps extends SVGComponentProps {
  size?: IconSize;
  variant?: IconVariant;
}

export default function ElementIcon({
  size = IconSize.MEDIUM,
  variant = IconVariant.DARK,
  ...props
}: InheritableElementProps<"svg", ElementIconProps>): ReactElement {
  const Component = IconComponent[variant];
  return (
    <Component height={IconHeight[size]} width={IconWidth[size]} {...props} />
  );
}

const IconComponent: Record<
  IconVariant,
  JSXElementConstructor<PropsOf<"svg">>
> = {
  [IconVariant.DARK]: SVG,
  [IconVariant.LIGHT]: SVGLight,
};
const IconHeight = {
  [IconSize.SMALL]: "12",
  [IconSize.MEDIUM]: "24",
  [IconSize.LARGE]: "48",
};
const IconWidth = {
  [IconSize.SMALL]: "12",
  [IconSize.MEDIUM]: "24",
  [IconSize.LARGE]: "48",
};
