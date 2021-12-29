import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H2 from "src/ui/base/H2";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";

interface SuccessCardProps {
  className?: string;
}

// PLACEHOLDER
const ElfiTokenAmount = "208.9291341";

export default function SuccessCard({
  className,
}: SuccessCardProps): ReactElement {
  const ElfiTokenAmountParts = ElfiTokenAmount.split(".");
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col justify-center gap-2 px-8 pt-2 pb-4 text-white sm:pt-6 sm:px-16 md:px-60 sm:pb-14 sm:text-center sm:items-center">
        <h1 className="mb-5 text-3xl font-semibold">{t`Congratulations`}</h1>
        <H2 className="text-2xl text-votingGreen mb-9">{t`You're eligible for this Airdrop`}</H2>
        <div className="bg-white rounded-lg flex flex-col items-center justify-center pt-16 px-10 pb-14 mb-6 min-w-full shadow-[0_0_52px_rgba(143,216,231,.7)]">
          <ElementIcon
            size={IconSize.LARGE}
            className="mb-8 shadow-none"
            bgColorClassName="bg-paleLily"
          />
          <p className="text-3xl font-semibold text-blueGrey">
            <span className="text-principalRoyalBlue">
              {ElfiTokenAmountParts[0]}
            </span>
            .{ElfiTokenAmountParts[1]}
          </p>
          <p className="text-blueGrey">{t`$ELFI tokens`}</p>
        </div>
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
