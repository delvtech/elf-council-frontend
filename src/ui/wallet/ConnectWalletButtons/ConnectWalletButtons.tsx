import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import React, { ReactElement, useCallback } from "react";
import tw, { display, flexDirection, justifyContent, overflow, padding, textColor, textAlign, margin, gap, height, width, space, alignItems, position, fontSize } from "src/elf-tailwindcss-classnames";
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
      className={tw(display("flex"), flexDirection("flex-col"), justifyContent("justify-center"), overflow("overflow-auto"), padding("p-8"))}
    >
      <H3
        className={tw(textColor("text-brandDarkBlue-dark"), textAlign("text-center"), margin("mb-8"))}
      >{t`Select Wallet`}</H3>
      <div className={tw(display("flex"), gap("gap-6"), justifyContent("justify-center"))}>
        <Button
          className={tw(height("h-auto"))}
          variant={ButtonVariant.MINIMAL}
          onClick={connectToMetaMask}
        >
          <div
            className={tw(display("flex"), flexDirection("flex-col"), width("w-32"), space("space-y-2"), padding("p-6"), justifyContent("justify-center"), alignItems("items-center"))}
          >
            <div className={tw(position("relative"), height("h-12"), width("w-12"))}>
              <Image layout="fill" src="/assets/metamask.svg" alt="MetaMask" />
            </div>
            <span className={tw(fontSize("text-base"))}>MetaMask</span>
          </div>
        </Button>
        <Button
          size={ButtonSize.AUTO}
          variant={ButtonVariant.MINIMAL}
          onClick={connectToWalletConnect}
        >
          <div
            className={tw(display("flex"), flexDirection("flex-col"), width("w-32"), space("space-y-2"), padding("p-6"), justifyContent("justify-center"), alignItems("items-center"))}
          >
            <div className={tw(position("relative"), height("h-12"), width("w-12"))}>
              <Image
                layout="fill"
                src="/assets/walletConnectIcon.svg"
                alt="MetaMask"
              />
            </div>
            <span className={tw(fontSize("text-base"))}>WalletConnect</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
