import React, { ReactElement } from "react";
import DiscordIcon from "src/ui/base/svg/DiscordIcon";
import TwitterIcon from "src/ui/base/svg/TwitterIcon";
import HomeIcon from "src/ui/base/svg/HomeIcon";
import ElementUrl from "src/elf/urls";

function Footer(): ReactElement {
  return (
    <div className="flex w-full justify-end space-x-3 px-16 pb-8">
      <a href={ElementUrl.TWITTER}>
        <TwitterIcon />
      </a>
      <a href={ElementUrl.DISCORD}>
        <DiscordIcon />
      </a>
      <a href={ElementUrl.CORE_LANDING}>
        <HomeIcon />
      </a>
    </div>
  );
}
export default Footer;
