import React, { ReactElement } from "react";
import DiscordIcon from "src/ui/base/svg/DiscordIcon";
import TwitterIcon from "src/ui/base/svg/TwitterIcon";
import HomeIcon from "src/ui/base/svg/HomeIcon";
import ElementUrls from "src/elf/urls";

function Footer(): ReactElement {
  return (
    <div className="flex w-full justify-end space-x-3 px-16 pb-8">
      <a href={ElementUrls.TWITTER}>
        <TwitterIcon />
      </a>
      <a href={ElementUrls.DISCORD}>
        <DiscordIcon />
      </a>
      <a href={ElementUrls.CORE_LANDING}>
        <HomeIcon />
      </a>
    </div>
  );
}
export default Footer;
