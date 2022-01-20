import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import React, { ReactElement, useCallback } from "react";
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
  const { activate, deactivate, active } = useWeb3React<Web3Provider>();

  const deactivateActiveConnector = useCallback(async () => {
    await deactivate();
  }, [deactivate]);

  const onClickClose = async () => {
    await deactivateActiveConnector();
    onClick?.();
  };

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
      className="flex flex-col justify-center overflow-auto p-2"
    >
      <H3 className="text-brandDarkBlue-dark text-center mb-8">{t`Select Wallet`}</H3>
      <div className="grid grid-cols-3 gap-2">
        <Button
          size={ButtonSize.AUTO}
          variant={ButtonVariant.MINIMAL}
          onClick={connectToMetaMask}
          className="grid place-items-center hover:bg-yieldLightBlue hover:bg-opacity-100 hover:text-white shadow-none"
        >
          <div className="grid place-items-center">
            <div className="relative h-16 w-16">
              <Image layout="fill" src="/assets/metamask.svg" alt="MetaMask" />
            </div>
            <span className="mt-2 text-base">MetaMask</span>
          </div>
        </Button>
        <Button
          size={ButtonSize.AUTO}
          variant={ButtonVariant.MINIMAL}
          onClick={connectToWalletConnect}
          className="grid place-items-center hover:bg-yieldLightBlue hover:bg-opacity-100 hover:text-white shadow-none"
        >
          <div className="h-full w-full grid place-items-center">
            <div className="relative h-16 w-16">
              <Image
                layout="fill"
                src="/assets/walletConnectIcon.svg"
                alt="MetaMask"
              />
            </div>
            <span className="mt-2 text-base">WalletConnect</span>
          </div>
        </Button>
      </div>
      <div className="mt-12">
        <p className="text-center text-principalRoyalBlue">
          {t`Note: Some connectors can only disconnect wallets from their app. Some connectors may also cause a page refresh.`}
        </p>
      </div>
      {active && onClick ? (
        <Button
          variant={ButtonVariant.PALE}
          onClick={onClickClose}
          className="grid place-items-center mt-4"
        >
          <span>{t`Close Wallet Connection`}</span>
        </Button>
      ) : null}
    </div>
  );
}
