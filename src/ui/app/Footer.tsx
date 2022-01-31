import React, { ReactElement } from "react";
import { DiscordIconFromFigma } from "src/ui/base/DiscordIconFromFigma";
import { TwitterIconFromFigma } from "src/ui/base/TwitterIconFromFigma";

function Footer(): ReactElement {
  return (
    <div className="flex justify-end w-full px-16 pb-8 space-x-3">
      <a href="https://twitter.com/element_fi">
        <TwitterIconFromFigma />
      </a>
      <a href="https://element.fi/discord">
        <DiscordIconFromFigma />
      </a>
      <a href="https://element.fi">
        <HomeIconFromFigma />
      </a>
    </div>
  );
}
export default Footer;
const HomeIconFromFigma = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3839 0.866117C10.8957 0.377961 10.1043 0.377961 9.61612 0.866117L0.866117 9.61612C0.377961 10.1043 0.377961 10.8957 0.866117 11.3839C1.35427 11.872 2.14573 11.872 2.63388 11.3839L3 11.0178V19.25C3 19.9404 3.55964 20.5 4.25 20.5H6.75C7.44036 20.5 8 19.9404 8 19.25V16.75C8 16.0596 8.55964 15.5 9.25 15.5H11.75C12.4404 15.5 13 16.0596 13 16.75V19.25C13 19.9404 13.5596 20.5 14.25 20.5H16.75C17.4404 20.5 18 19.9404 18 19.25V11.0178L18.3661 11.3839C18.8543 11.872 19.6457 11.872 20.1339 11.3839C20.622 10.8957 20.622 10.1043 20.1339 9.61612L11.3839 0.866117Z"
        fill="#005EBE"
      />
    </svg>
  );
};
