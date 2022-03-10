import { ReactElement } from "react";
import { PropsOf } from "src/@types/helper";
import Svg from "./walletConnectIcon.svg";

export default function WalletConnectIcon(props: PropsOf<"svg">): ReactElement {
  return <Svg {...props} />;
}
