import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import {
  ConnectWalletButton,
  WalletProfileButton,
} from "src/ui/wallet/ConnectWalletButton";
import { jt, t } from "ttag";

interface StartAirdropCardProps {
  account: string | null | undefined;
  walletConnectionActive: boolean | undefined;
  onNextStep: () => void;
}

const elementIconInSubtitle = (
  <ElementIcon
    key="element-icon-in-subtitle"
    className="inline-block mx-1 bg-paleLily"
    size={IconSize.MEDIUM}
  />
);
const elementIconInBodyText = (
  <ElementIcon
    key="element-icon-in-body-text"
    className="bg-paleLily inline-block ml-0.5 mr-2 -mb-1.5"
    size={IconSize.MEDIUM}
  />
);

export function StartAirdropCard({
  walletConnectionActive,
  account,
  onNextStep,
}: StartAirdropCardProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex flex-col w-full h-full min-h-full text-center text-white"
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
        <div className="flex flex-col items-center justify-center w-full space-y-8 md:w-7/12">
          <span className="flex items-center text-base font-semibold tracking-wider text-center">{jt`Introducing ${elementIconInSubtitle} ELFI`}</span>
          <div className="text-3xl font-bold">{t`Help contribute to the next wave of Element`}</div>
          <div className="flex flex-col px-2 space-y-8 text-base text-justify">
            <p className="inline">
              {jt`With the launch of the ${elementIconInBodyText}ELFI token and
              the Element DAO, the community now leads the future of the
              protocol.`}
            </p>
            <p className="inline">
              {jt`${elementIconInBodyText}ELFI token depositors can choose to
              directly participate in governance or delegate their votes to
              another member.`}
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
