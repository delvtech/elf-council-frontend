import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H2 from "src/ui/base/H2/H2";
import ClaimAmountCard from "./ClaimAmountCard";
import { t } from "ttag";

interface ClaimCardProps {
  className?: string;
}

// PLACEHOLDER
const ELFI_TOKEN_AMOUNT = "208.9291341";

export default function ClaimCard({ className }: ClaimCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col justify-center gap-2 px-8 pt-2 pb-4 text-white sm:pt-6 sm:px-16 md:px-60 sm:pb-14 sm:text-center sm:items-center">
        <h1 className="mb-5 text-3xl font-semibold">{t`Congratulations`}</h1>
        <H2 className="text-2xl text-votingGreen mb-9">{t`You're eligible for this Airdrop`}</H2>
        <ClaimAmountCard amount={ELFI_TOKEN_AMOUNT} />
        <label className="flex items-center gap-3 mb-6 text-blueGrey group">
          <input
            id="add-elfi-to-metamask"
            type="checkbox"
            className="box-content w-4 h-4 text-current transition-all bg-transparent bg-center border-2 border-current rounded group:hover:border-white hover:border-white checked:border-white checked:focus:border-white checked:hover:border-white checked:text-principalRoyalBlue peer"
            style={{ backgroundSize: "80%" }}
          />
          <span className="transition-all peer-checked:text-white">{t`Add $ELFI to my Metamask`}</span>
        </label>
        <Button
          className="justify-center min-w-full"
          variant={ButtonVariant.GRADIENT}
        >{t`Claim my $ELFI`}</Button>
      </div>
    </Card>
  );
}
