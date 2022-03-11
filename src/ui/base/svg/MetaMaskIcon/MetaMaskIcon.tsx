import { ReactElement } from "react";
import { SVGComponentProps } from "src/ui/base/svg/types";
import Svg from "./metaMaskIcon.svg";

export default function MetaMaskIcon(props: SVGComponentProps): ReactElement {
  return <Svg {...props} />;
}
