import { ReactElement } from "react";
import { SVGComponentProps } from "src/ui/base/svg/types";
import Svg from "./coinbaseWallet.svg";

export default function coinbaseIcon(props: SVGComponentProps): ReactElement {
  return <Svg {...props} />;
}
