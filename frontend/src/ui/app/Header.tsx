import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import tw from "src/elf-tailwindcss-classnames";

function Header(): ReactElement {
  const { account, active, chainId } = useWeb3React();
  return (
    <div className={tw("flex", "justify-between")}>
      <div className={tw("flex", "space-x-3")}></div>
      <div className={tw("flex", "space-x-4", "text-gray-400", "mr-3")}>
        <LinkButton round variant={ButtonVariant.GRADIENT} link="/rewards">
          0.00 ELF
        </LinkButton>
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
