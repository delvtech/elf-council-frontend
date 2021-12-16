import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import React, { ReactElement, useCallback } from "react";
import tw from "src/elf-tailwindcss-classnames";
import {
  getWalletConnectConnector,
  injectedConnector,
} from "src/elf/wallets/connectors";
import Button from "src/ui/base/Button/Button";
import { ButtonSize, ButtonVariant } from "src/ui/base/Button/styles";
import H3 from "src/ui/base/H3";
import { t } from "ttag";

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
        "justify-center",
        "overflow-auto",
        "p-8"
      )}
    >
      <H3
        className={tw("text-brandDarkBlue-dark", "text-center", "mb-8")}
      >{t`Select Wallet`}</H3>
      <div className={tw("flex", "gap-6", "justify-center")}>
        <Button
          className={tw("h-auto")}
          variant={ButtonVariant.MINIMAL}
          onClick={connectToMetaMask}
        >
          <div
            className={tw(
              "flex",
              "flex-col",
              "w-32",
              "space-y-2",
              "p-6",
              "justify-center",
              "items-center"
            )}
          >
            <Image
              height={48}
              width={48}
              src="/assets/metamask.svg"
              alt="MetaMask"
            />
            <span className={tw("text-base")}>MetaMask</span>
          </div>
        </Button>
        <Button
          size={ButtonSize.AUTO}
          variant={ButtonVariant.MINIMAL}
          onClick={connectToWalletConnect}
        >
          <div
            className={tw(
              "flex",
              "flex-col",
              "w-32",
              "space-y-2",
              "p-6",
              "justify-center",
              "items-center"
            )}
          >
            <Image
              height={48}
              width={48}
              src="/assets/walletConnectIcon.svg"
              alt="MetaMask"
            />
            <span className={tw("text-base")}>WalletConnect</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
