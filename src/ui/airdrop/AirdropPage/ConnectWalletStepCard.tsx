import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import {
  ConnectWalletButton,
  WalletProfileButton,
} from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { t } from "ttag";

interface ConnectWalletStepCardProps {
  account: string | null | undefined;
  walletConnectionActive: boolean | undefined;
  onNextStep: () => void;
}

export function ConnectWalletStepCard({
  walletConnectionActive,
  account,
  onNextStep,
}: ConnectWalletStepCardProps): ReactElement {
  return (
    <Card className={tw("flex", "flex-col", "h-96", "text-center", "w-full")}>
      <div className={tw("p-12", "space-y-5")}>
        <div
          className={tw(
            "text-center",
            "font-semibold",
            "tracking-wider",
            "text-sm"
          )}
        >{t`Introducing $ELFI`}</div>
        <div
          className={tw("text-2xl", "font-bold")}
        >{t`Help contribute to the next wave of Element`}</div>
        <div className={tw("text-sm", "text-center", "space-y-4", "px-4")}>
          <p>
            {t`With the launch of $ELFI and the DAO, the community now leads the future of the protocol. `}{" "}
          </p>
        </div>
        <div
          className={tw(
            "flex",
            "h-full",
            "justify-center",
            "items-end",
            "w-full",
            "space-x-4"
          )}
        >
          {!account ? (
            <ConnectWalletButton
              label={t`Connect your wallet to begin`}
              variant={ButtonVariant.GRADIENT}
            />
          ) : (
            <WalletProfileButton
              variant={ButtonVariant.OUTLINE_BLUE}
              account={account}
              walletConnectionActive={walletConnectionActive}
            />
          )}
          <Button
            disabled={!account}
            variant={ButtonVariant.GRADIENT}
            onClick={onNextStep}
          >{t`Start claiming`}</Button>
        </div>
      </div>
    </Card>
  );
}
