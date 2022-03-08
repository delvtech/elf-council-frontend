import { Provider } from "@ethersproject/providers";
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
  library: Provider | undefined;
  walletConnectionActive: boolean | undefined;
  onNextStep: () => void;
}

const elementIcon = (
  <ElementIcon key="element-icon" inline size={IconSize.MEDIUM} />
);

export function StartAirdropCard({
  walletConnectionActive,
  account,
  library,
  onNextStep,
}: StartAirdropCardProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex h-full min-h-full w-full flex-col text-center text-white"
    >
      <div className="flex justify-end p-2">
        {!account ? (
          <ConnectWalletButton
            label={t`Connect wallet`}
            variant={ButtonVariant.GRADIENT}
            onDialogClose={onNextStep}
          />
        ) : (
          <WalletProfileButton
            provider={library}
            variant={ButtonVariant.PRIMARY}
            account={account}
            walletConnectionActive={walletConnectionActive}
          />
        )}
      </div>
      <div className="flex h-full flex-col items-center justify-center space-y-5 p-12">
        <div className="flex w-full flex-col items-center justify-center space-y-8 md:w-7/12">
          <span className="flex items-center text-center text-base font-semibold tracking-wider">{jt`Introducing ${elementIcon} ELFI`}</span>
          <div className="text-3xl font-bold">{t`Contribute to the evolution of the Element DAO`}</div>
          <div className="flex flex-col space-y-8 px-2 text-justify text-base">
            <p className="inline">
              {t`With the launch of the Element DAO, the community now leads the
              future of the protocol.`}
            </p>
            <p className="inline">
              {jt`${elementIcon}ELFI airdrop recipients can use their
              voting power to participate in governance, or delegate their votes
              to another member.`}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-center space-x-4 pt-12">
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
