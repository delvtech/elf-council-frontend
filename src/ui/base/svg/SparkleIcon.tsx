import { ReactElement } from "react";
import classNames from "classnames";
import { SVGComponentProps } from "./types";

export default function GitHubIcon({
  className,
  ...props
}: SVGComponentProps): ReactElement {
  return (
    <svg
      width="108"
      height="109"
      viewBox="0 0 108 109"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-hackerSky", className)}
      {...props}
    >
      <path d="M60 84C66.7097 83.6795 72.3871 81.0994 77.0323 76.2596C81.6774 71.4199 84 65.6667 84 59C84 65.6667 86.3226 71.4199 90.9677 76.2596C95.6129 81.0994 101.29 83.6795 108 84C101.29 84.3205 95.6129 86.9006 90.9677 91.7404C86.3226 96.5801 84 102.333 84 109C84 102.333 81.6774 96.5801 77.0323 91.7404C72.3871 86.9006 66.7097 84.3205 60 84Z" />
      <path d="M0 46.9073C12.5336 46.2893 23.1593 41.4533 31.8769 32.3994C40.5946 23.3455 44.9535 12.5457 44.9535 0C44.9535 12.5457 49.3278 23.3455 58.0765 32.3994C66.8252 41.4533 77.4664 46.2893 90 46.9073C81.7477 47.2781 74.1779 49.6111 67.2906 53.9063C60.4033 58.2015 54.9586 63.8872 50.9566 70.9635C46.9545 78.0398 44.9535 85.7186 44.9535 94C44.9535 81.3925 40.5946 70.5464 31.8769 61.4615C23.1593 52.3767 12.5336 47.5253 0 46.9073Z" />
    </svg>
  );
}
