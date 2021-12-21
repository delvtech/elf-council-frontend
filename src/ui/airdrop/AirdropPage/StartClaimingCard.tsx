import React, { ReactElement } from "react";
import tw, {
  display,
  flexDirection,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  letterSpacing,
  padding,
  space,
  textAlign,
  textColor,
  width,
} from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import {
  ConnectWalletButton,
  WalletProfileButton,
} from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { t } from "ttag";

interface StartClaimingCardProps {
  account: string | null | undefined;
  walletConnectionActive: boolean | undefined;
  onNextStep: () => void;
}

export function StartClaimingCard({
  walletConnectionActive,
  account,
  onNextStep,
}: StartClaimingCardProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        height("h-96"),
        textAlign("text-center"),
        textColor("text-white"),
        width("w-full"),
      )}
    >
      <div
        className={tw(
          padding("p-6"),
          display("flex"),
          flexDirection("flex-col"),
          height("h-full"),
          space("space-y-5"),
        )}
      >
        <div className={tw(display("flex"), justifyContent("justify-end"))}>
          {!account ? (
            <ConnectWalletButton
              label={t`Connect wallet`}
              variant={ButtonVariant.GRADIENT}
            />
          ) : (
            <WalletProfileButton
              variant={ButtonVariant.OUTLINE_BLUE}
              account={account}
              walletConnectionActive={walletConnectionActive}
            />
          )}
        </div>
        <div
          className={tw(
            textAlign("text-center"),
            fontWeight("font-semibold"),
            letterSpacing("tracking-wider"),
            fontSize("text-base"),
          )}
        >{t`Introducing $ELFI`}</div>
        <div
          className={tw(fontSize("text-3xl"), fontWeight("font-bold"))}
        >{t`Help contribute to the next wave of Element`}</div>
        <div
          className={tw(
            fontSize("text-base"),
            textAlign("text-center"),
            space("space-y-4"),
            padding("px-4"),
          )}
        >
          <p>
            {t`With the launch of $ELFI and the DAO, the community now leads the future of the protocol. `}{" "}
          </p>
        </div>
        <div
          className={tw(
            display("flex"),
            justifyContent("justify-center"),
            width("w-full"),
            space("space-x-4"),
            padding("pt-12"),
          )}
        >
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
