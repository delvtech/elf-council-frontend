import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import ClaimAmountCard from "./ClaimAmountCard";
import { t } from "ttag";
import { PrivateAirdrop } from "@elementfi/elf-council-typechain";

interface AlreadyClaimedCardProps {
  className?: string;
  contract: PrivateAirdrop | undefined;
}

export default function AlreadyClaimedCard({
  className,
  contract,
}: AlreadyClaimedCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col justify-center gap-2 px-8 pt-2 pb-4 text-white sm:items-center sm:px-16 sm:pt-6 sm:pb-14 sm:text-center md:px-32">
        <h1 className="mb-5 text-3xl font-semibold">{t`Congratulations!`}</h1>
        <H2 className="mb-9 text-2xl text-votingGreen">{t`You've already claimed your $ELFI.`}</H2>
        <ClaimAmountCard label={t`Claimed voting power`} contract={contract} />
      </div>
    </Card>
  );
}
