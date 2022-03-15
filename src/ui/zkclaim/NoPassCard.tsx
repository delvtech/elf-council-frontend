import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H2 from "src/ui/base/H2/H2";

interface NoPassCardProps {
  className?: string;
  onPreviousStep?: () => void;
}

export default function NoPassCard({
  className,
  onPreviousStep,
}: NoPassCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col justify-center gap-2 px-6 pt-6 pb-4 text-white sm:items-center sm:px-20 sm:pt-20 sm:pb-14 sm:text-center">
        <h1 className="mb-5 text-3xl font-semibold">{t`Public ID not eligible`}</h1>
        <H2 className="mb-12 text-2xl text-goldYellow sm:mb-24">{t`This account is not eligible for the airdrop`}</H2>
        <Button
          variant={ButtonVariant.WHITE}
          onClick={onPreviousStep}
        >{t`Back`}</Button>
      </div>
    </Card>
  );
}
