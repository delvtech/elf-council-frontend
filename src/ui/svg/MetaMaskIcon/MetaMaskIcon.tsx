import { ReactElement } from "react";
import { PropsOf } from "src/@types/helper";
import Svg from "./metaMaskIcon.svg";

export default function MetaMaskIcon(props: PropsOf<"svg">): ReactElement {
  return <Svg {...props} />;
}
