import { ReactElement } from "react";
import { PropsOf } from "src/@types/helper";
import Svg from "./CouncilLogo.svg";

export default function CouncilLogo(props: PropsOf<"svg">): ReactElement {
  return <Svg {...props} />;
}
