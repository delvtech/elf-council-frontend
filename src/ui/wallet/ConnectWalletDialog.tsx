import React, { ReactElement, useCallback } from "react";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import {
  getWalletConnectConnector,
  injectedConnector,
} from "src/elf/wallets/connectors";
import Button from "src/ui/base/Button/Button";
import { ButtonSize, ButtonVariant } from "src/ui/base/Button/styles";
import H3 from "src/ui/base/H3/H3";
import { t } from "ttag";

interface ConnectWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected?: () => void;
}
export function ConnectWalletDialog({
  isOpen,
  onClose,
  onConnected,
}: ConnectWalletDialogProps): ReactElement {
  const { activate, deactivate, active } = useWeb3React<Web3Provider>();

  const deactivateActiveConnector = useCallback(async () => {
    await deactivate();
  }, [deactivate]);

  const connectToMetaMask = useCallback(async () => {
    await deactivateActiveConnector();
    await activate(injectedConnector, deactivateActiveConnector);
    onConnected?.();
    onClose?.();
  }, [activate, deactivateActiveConnector, onClose, onConnected]);

  const connectToWalletConnect = useCallback(async () => {
    await deactivateActiveConnector();
    const walletConnectConnector = getWalletConnectConnector();
    await activate(walletConnectConnector, deactivateActiveConnector);
    onConnected?.();
    onClose?.();
  }, [activate, deactivateActiveConnector, onClose, onConnected]);

  return (
    <SimpleDialog isOpen={isOpen} onClose={onClose}>
      <div
        data-testid="connect-wallet-buttons"
        className="flex flex-col justify-center overflow-auto p-2"
      >
        <H3 className="mb-8 text-center text-brandDarkBlue-dark">{t`Select Wallet`}</H3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            size={ButtonSize.AUTO}
            variant={ButtonVariant.MINIMAL}
            onClick={connectToMetaMask}
            className="grid place-items-center shadow-none hover:bg-yieldLightBlue hover:bg-opacity-100 hover:text-white"
          >
            <div className="grid place-items-center">
              <div className="relative h-16 w-16">
                <Image
                  layout="fill"
                  src="/assets/metamask.svg"
                  alt="MetaMask"
                />
              </div>
              <span className="mt-2 text-base">MetaMask</span>
            </div>
          </Button>
          <Button
            size={ButtonSize.AUTO}
            variant={ButtonVariant.MINIMAL}
            onClick={connectToWalletConnect}
            className="grid place-items-center shadow-none hover:bg-yieldLightBlue hover:bg-opacity-100 hover:text-white"
          >
            <div className="grid h-full w-full place-items-center">
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
        {active ? (
          <Button
            variant={ButtonVariant.PALE}
            onClick={onClose}
            className="mt-4 grid place-items-center"
          >
            <span>{t`Close Wallet Connection`}</span>
          </Button>
        ) : null}
      </div>
    </SimpleDialog>
  );
}
