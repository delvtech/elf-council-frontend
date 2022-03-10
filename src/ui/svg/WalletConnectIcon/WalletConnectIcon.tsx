import { ReactElement } from "react";
import { SVGComponentProps } from "src/ui/svg/types";
import Svg from "./walletConnectIcon.svg";

export default function WalletConnectIcon(
  props: SVGComponentProps,
): ReactElement {
  return <Svg {...props} />;
}
