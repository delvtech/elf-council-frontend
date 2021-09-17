import React, { ReactElement } from "react";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { ConnectWalletButton } from "components/ConnectWalletButton/ConnectWalletButton";
import tw from "elf-tailwindcss-classnames";

function Header(): ReactElement {
  return (
    <div
      className={tw(
        "flex",
        "shadow-sm",
        "bg-gray-50",
        "p-4",
        "justify-between"
      )}
    >
      <div className={tw("flex", "space-x-3")}></div>
      <div className={tw("flex", "space-x-4", "text-gray-400", "mr-3")}>
        <NotificationsIcon />
        <ExitToAppIcon />
        <ConnectWalletButton
          account={undefined}
          walletConnectionActive={undefined}
          chainId={undefined}
        />
      </div>
    </div>
  );
}

export default Header;
