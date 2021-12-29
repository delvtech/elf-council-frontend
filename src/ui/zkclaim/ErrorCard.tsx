import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H2 from "src/ui/base/H2";
import Link from "next/link";

interface SuccessCardProps {
  className?: string;
  onTryAgain?: () => void;
}

export default function SuccessCard({
  className,
  onTryAgain,
}: SuccessCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="text-white pt-6 sm:pt-20 px-6 sm:px-20 pb-4 sm:pb-14 sm:text-center flex justify-center sm:items-center flex-col gap-2">
        <h1 className="text-3xl font-semibold mb-5">{t`Public ID not found`}</h1>
        <H2 className="text-goldYellow text-2xl">{t`This wallet is not eligible for the airdrop`}</H2>
        <p className="mb-12 sm:mb-24">{t`Please make sure you are connected with the right account`}</p>
        <div className="flex gap-4">
          {onTryAgain && (
            <Button
              variant={ButtonVariant.WHITE}
              onClick={onTryAgain}
            >{t`Try Again`}</Button>
          )}
          <Link href="/zk">
            <a>
              <Button
                className="min-w-full justify-center"
                variant={ButtonVariant.GRADIENT}
              >{t`Create new Public ID`}</Button>
            </a>
          </Link>
        </div>
      </div>
    </Card>
  );
}
