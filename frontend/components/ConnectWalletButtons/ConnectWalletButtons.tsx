import React, { ReactElement, useCallback } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

// import { ReactComponent as MetamaskIcon } from "efi-static-assets/logos/metamask.svg";
// import { ReactComponent as WalletConnectIcon } from "efi-static-assets/logos/walletConnectIcon.svg";
import tw from "elf-tailwindcss-classnames";
import {
  getWalletConnectConnector,
  injectedConnector,
} from "elf/efi/wallets/connectors";

const connectorButtonClassName = tw("p-12", "w-1/4", "flex-col", "space-y-3");
// const iconStyle: CSSProperties = {
//   height: 48,
//   width: 48,
// };

interface ConnectWalletButtonsProps {
  onClick?: () => void;
}

export function ConnectWalletButtons({
  onClick,
}: ConnectWalletButtonsProps): ReactElement {
  const { activate, deactivate } = useWeb3React<Web3Provider>();

  const deactivateActiveConnector = useCallback(async () => {
    await deactivate();
  }, [deactivate]);

  const connectToMetaMask = useCallback(async () => {
    await deactivateActiveConnector();
    activate(injectedConnector, deactivateActiveConnector);
    onClick?.();
  }, [activate, deactivateActiveConnector, onClick]);

  const connectToWalletConnect = useCallback(async () => {
    await deactivateActiveConnector();
    const walletConnectConnector = getWalletConnectConnector();
    activate(walletConnectConnector, deactivateActiveConnector);
    onClick?.();
  }, [activate, deactivateActiveConnector, onClick]);

  return (
    <div
      data-testid="connect-wallet-buttons"
      className={tw(
        "flex",
        "flex-col",
        "w-full",
        "justify-center",
        "overflow-scroll"
      )}
    >
      <button className={connectorButtonClassName} onClick={connectToMetaMask}>
        {/* <MetamaskIcon style={iconStyle} /> */}
        <span className={tw("text-base")}>MetaMask</span>
      </button>
      <button
        className={connectorButtonClassName}
        onClick={connectToWalletConnect}
      >
        {/* <WalletConnectIcon style={iconStyle} /> */}
        <span className={tw("text-base")}>WalletConnect</span>
      </button>
    </div>
  );
}
