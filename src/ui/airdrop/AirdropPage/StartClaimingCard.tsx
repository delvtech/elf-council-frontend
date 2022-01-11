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
      className="flex flex-col h-full min-h-full text-center text-white w-full"
    >
      <div className="flex p-2 justify-end">
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
      <div className="p-12 flex flex-col items-center justify-center h-full space-y-5">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-8">
          <div className="text-center font-semibold tracking-wider text-base">{t`Introducing $ELFI`}</div>
          <div className="text-3xl font-bold">{t`Help contribute to the next wave of Element`}</div>
          <div className="text-base text-center space-y-4 px-4">
            <p>
              {t`With the launch of $ELFI and the DAO, the community now leads the future of the protocol. `}{" "}
            </p>
          </div>
        </div>

        <div className="flex justify-center w-full space-x-4 pt-12">
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
