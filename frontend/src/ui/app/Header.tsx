import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import { TokenRewardsButton } from "src/ui/app/TokenRewardsButton";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";

function Header(): ReactElement {
  const { account, active, chainId } = useWeb3React();
  return (
    <div className={tw("flex", "justify-between")}>
      <div className={tw("flex", "space-x-3")}></div>
      <div className={tw("flex", "space-x-4", "text-gray-400", "mr-3")}>
        <TokenRewardsButton account={account} />
        <ConnectWalletButton
          account={account}
          walletConnectionActive={active}
          chainId={chainId}
        />
      </div>
    </div>
  );
}

export default Header;
