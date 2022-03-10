import { ReactElement } from "react";
import { SVGComponentProps } from "src/ui/svg/types";
import SVG from "./CouncilLogo.svg";

export default function CouncilLogo(props: SVGComponentProps): ReactElement {
  return <SVG {...props} />;
}
