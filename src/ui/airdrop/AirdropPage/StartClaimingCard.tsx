import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import {
  ConnectWalletButton,
  WalletProfileButton,
} from "src/ui/wallet/ConnectWalletButton";
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
      className="flex h-[600px] flex-col min-h-full text-center text-white w-full"
    >
      <div className="flex justify-end p-2">
        {!account ? (
          <ConnectWalletButton
            label={t`Connect wallet`}
            variant={ButtonVariant.GRADIENT}
          />
        ) : (
          <WalletProfileButton
            variant={ButtonVariant.PRIMARY}
            account={account}
            walletConnectionActive={walletConnectionActive}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center h-full p-12 space-y-5">
        <div className="flex flex-col items-center justify-center w-full space-y-8 md:w-1/2">
          <div className="text-base font-semibold tracking-wider text-center">{t`Introducing $ELFI`}</div>
          <div className="text-3xl font-bold">{t`Help contribute to the next wave of Element`}</div>
          <div className="px-4 space-y-4 text-base text-center">
            <p>
              {t`With the launch of $ELFI and the DAO, the community now leads the future of the protocol. `}{" "}
            </p>
          </div>
        </div>

        <div className="flex justify-center w-full pt-12 space-x-4">
          <Button
            disabled={!account}
            variant={ButtonVariant.GRADIENT}
            onClick={onNextStep}
          >{t`Check for airdrop`}</Button>
        </div>
      </div>
    </Card>
  );
}
