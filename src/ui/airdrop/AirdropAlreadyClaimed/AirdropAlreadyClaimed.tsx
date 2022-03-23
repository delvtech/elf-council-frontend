import React, { ReactElement } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import { t } from "ttag";
import { ClaimedAmountCard } from "src/ui/airdrop/AirdropAlreadyClaimed/ClaimedAmountCard";
import { DelegatedCard } from "src/ui/airdrop/AirdropAlreadyClaimed/DelegatedCard";
import { Provider } from "@ethersproject/providers";

interface AirdropAlreadyClaimedProps {
  account: string | null | undefined;
  provider?: Provider;
}

export function AirdropAlreadyClaimed({
  account,
  provider,
}: AirdropAlreadyClaimedProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex h-[600px] flex-col text-center text-white"
    >
      <div className="flex flex-col p-2">
        <div className="text-right">
          <Tag intent={Intent.WARNING}>
            <span className="font-bold">{t`Already claimed tokens`}</span>
            <ShieldExclamationIcon height={24} className="ml-4" />
          </Tag>
        </div>
        <div className="mb-10 text-left text-3xl font-bold">{t`Review Claim`}</div>
        <div className="mb-10 flex w-full justify-center text-base font-bold">
          <span className="w-full md:w-1/2">{t`You have already claimed the $ELFI tokens in which you were eligible for.`}</span>
        </div>
        <div className="mb-10 flex w-full flex-col space-y-10 px-12 md:flex-row md:space-x-10 md:space-y-0">
          <ClaimedAmountCard account={account} />
          <DelegatedCard account={account} provider={provider} />
        </div>
        <div className="flex w-full justify-center text-base">
          <span className="w-full md:w-1/2">{t`To change your delegation, you can visit our delegate dashboard live in our main governance system.`}</span>
        </div>
      </div>
    </Card>
  );
}
