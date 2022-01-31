import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import ClaimAmountCard from "./ClaimAmountCard";
import { t } from "ttag";

interface SuccessCardProps {
  className?: string;
}

// PLACEHOLDER
const ELFI_TOKEN_AMOUNT = "208.9291341";

export default function SuccessCard({
  className,
}: SuccessCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col justify-center gap-2 px-8 pt-2 pb-4 text-white sm:pt-6 sm:px-16 md:px-40 sm:pb-14 sm:text-center sm:items-center">
        <h1 className="mb-5 text-3xl font-semibold">{t`Congratulations`}</h1>
        <H2 className="text-2xl text-votingGreen mb-9">{t`You've already claimed your $ELFI.`}</H2>
        <ClaimAmountCard amount={ELFI_TOKEN_AMOUNT} />
      </div>
    </Card>
  );
}
