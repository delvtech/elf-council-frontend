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
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        "flex",
        "flex-col",
        "text-white",
        "space-y-5",
        "text-center"
      )}
    >
      <div
        className={tw(
          "text-center",
          "font-semibold",
          "tracking-wider",
          "text-sm"
        )}
      >{t`Introducing $ELFI`}</div>
      <div
        className={tw("text-2xl", "font-bold", "text-white")}
      >{t`Advocate for the future of fixed rates.`}</div>
      <div className={tw("text-sm", "space-y-4", "text-justify", "px-4")}>
        <p>
          {t`If you were an early participant in Element, you maybe have been awarded some $ELFI.`}{" "}
          <a
            href="https://ADD_LINK_HERE"
            className={tw("text-goldYellow", "hover:underline")}
          >{t`Learn more about our distribution.`}</a>
        </p>
        <p>{t`Connect your wallet to see if you have any tokens available to claim!`}</p>
      </div>
      <div className={tw("flex", "justify-end", "w-full", "space-x-4")}>
        {!account ? (
          <ConnectWalletButton
            label={t`Connect your wallet to begin`}
            variant={ButtonVariant.OUTLINE_WHITE}
          />
        ) : (
          <WalletProfileButton
            variant={ButtonVariant.OUTLINE_WHITE}
            account={account}
            walletConnectionActive={walletConnectionActive}
          />
        )}
        <Button
          disabled={!account}
          variant={ButtonVariant.OUTLINE_WHITE}
          onClick={onNextStep}
        >{t`Next`}</Button>
      </div>
    </Card>
  );
}
