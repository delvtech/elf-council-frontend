import React, { ReactElement, useCallback } from "react";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import {
  getWalletConnectConnector,
  injectedConnector,
} from "src/elf/wallets/connectors";
import Button from "src/ui/base/Button/Button";
import { ButtonSize, ButtonVariant } from "src/ui/base/Button/styles";
import H3 from "src/ui/base/H3/H3";
import MetaMaskIcon from "src/ui/base/svg/MetaMaskIcon/MetaMaskIcon";
import WalletConnectIcon from "src/ui/base/svg/WalletConnectIcon/WalletConnectIcon";
import { t } from "ttag";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

interface ConnectWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ConnectWalletDialog({
  isOpen,
  onClose,
}: ConnectWalletDialogProps): ReactElement {
  const {
    activate,
    deactivate: deactivateActiveConnector,
    active,
  } = useWeb3React<Web3Provider>();

  const activateConnector = useCallback(
    async (connector: InjectedConnector | WalletConnectConnector) => {
      await activate(connector, deactivateActiveConnector);
      onClose?.();
    },
    [activate, deactivateActiveConnector, onClose],
  );

  const handleConnectToMetaMask = useCallback(async () => {
    await deactivateActiveConnector();
    await activateConnector(injectedConnector);
  }, [activateConnector, deactivateActiveConnector]);

  const handleConnectToWalletConnect = useCallback(async () => {
    await deactivateActiveConnector();
    const walletConnectConnector = getWalletConnectConnector();
    await activateConnector(walletConnectConnector);
  }, [activateConnector, deactivateActiveConnector]);

  return (
    <SimpleDialog isOpen={isOpen} onClose={onClose}>
      <div
        data-testid="connect-wallet-buttons"
        className="flex flex-col justify-center overflow-auto p-2"
      >
        <H3 className="mb-8 text-center text-brandDarkBlue-dark">{t`Select Wallet`}</H3>
        <div className="flex justify-center gap-4">
          <Button
            size={ButtonSize.AUTO}
            variant={ButtonVariant.MINIMAL}
            onClick={handleConnectToMetaMask}
            className="grid w-1/3 place-items-center shadow-none hover:bg-yieldLightBlue hover:bg-opacity-100 hover:text-white"
          >
            <div className="grid place-items-center">
              <MetaMaskIcon className="h-16 w-16" />
              <span className="mt-2 text-base">MetaMask</span>
            </div>
          </Button>
          <Button
            size={ButtonSize.AUTO}
            variant={ButtonVariant.MINIMAL}
            onClick={handleConnectToWalletConnect}
            className="grid w-1/3 place-items-center shadow-none hover:bg-yieldLightBlue hover:bg-opacity-100 hover:text-white"
          >
            <div className="grid h-full w-full place-items-center">
              <WalletConnectIcon className="h-16 w-16" />
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
