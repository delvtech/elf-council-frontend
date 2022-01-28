import React, { ReactElement } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import { t } from "ttag";
import { ClaimedAmountCard } from "src/ui/airdrop/AirdropAlreadyClaimed/ClaimedAmountCard";
import { DelegatedCard } from "src/ui/airdrop/AirdropAlreadyClaimed/DelegatedCard";

interface AirdropAlreadyClaimedProps {
  account: string | null | undefined;
}

export function AirdropAlreadyClaimed({
  account,
}: AirdropAlreadyClaimedProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex flex-col text-white text-center h-[600px]"
    >
      <div className="flex flex-col p-2">
        <div className="text-right">
          <Tag intent={Intent.WARNING}>
            <span className="font-bold">{t`Already claimed tokens`}</span>
            <ShieldExclamationIcon height={24} className="ml-4" />
          </Tag>
        </div>
        <div className="mb-10 text-3xl font-bold text-left">{t`Review Claim`}</div>
        <div className="flex justify-center w-full mb-10 text-base font-bold">
          <span className="w-full md:w-1/2">{t`You have already claimed the $ELFI tokens in which you were eligible for.`}</span>
        </div>
        <div className="flex flex-col w-full px-12 mb-10 space-y-10 md:flex-row md:space-x-10 md:space-y-0">
          <ClaimedAmountCard account={account} />
          <DelegatedCard account={account} />
        </div>
        <div className="flex justify-center w-full text-base">
          <span className="w-full md:w-1/2">{t`To change your delegation, you can visit our delegate dashboard live in our main governance system.`}</span>
        </div>
      </div>
    </Card>
  );
}
