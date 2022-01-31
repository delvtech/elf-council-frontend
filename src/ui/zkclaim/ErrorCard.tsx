import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H2 from "src/ui/base/H2/H2";

interface ErrorCardProps {
  className?: string;
  onTryAgain?: () => void;
}

export default function ErrorCard({
  className,
  onTryAgain,
}: ErrorCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col justify-center gap-2 px-6 pt-6 pb-4 text-white sm:pt-20 sm:px-20 sm:pb-14 sm:text-center sm:items-center">
        <h1 className="mb-5 text-3xl font-semibold">{t`Public ID not found`}</h1>
        <H2 className="text-2xl text-goldYellow">{t`This wallet is not eligible for the airdrop`}</H2>
        <p className="mb-12 sm:mb-24">{t`Please make sure you are connected with the right account`}</p>
        <div className="flex gap-4">
          {onTryAgain && (
            <Button
              variant={ButtonVariant.WHITE}
              onClick={onTryAgain}
            >{t`Try Again`}</Button>
          )}
        </div>
      </div>
    </Card>
  );
}
