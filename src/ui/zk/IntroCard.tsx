import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import { t } from "ttag";

interface IntroCardProps {
  className?: string;
  onNextClick: () => void;
}

export default function IntroCard({
  className,
  onNextClick,
}: IntroCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="p-2 text-white sm:p-6">
        <h1 className="mb-4 text-3xl font-semibold text-white">{t`Claiming`}</h1>
        <div className="flex flex-col gap-2 px-5 py-4 mb-6 rounded-lg sm:py-6 sm:px-8 bg-white/10">
          <H2 className="text-white">{t`Creating your Public ID`}</H2>
          <p>{t`In the next step, you'll randomly generate a new private key and secret which are used to create your Public ID. This Public ID allows you claim participation in our governance system without revealing any personal information. This process is called ZK Method. You will not be inputting any information through this flow.`}</p>
          <H2 className="mt-4 text-white">{t`What is ZK Method?`}</H2>
          <p>{t`A ZK Method refers to a proof construction where one can prove possession of certain information, e.g. a secret key, without revealing that information, and without any interaction between the prover and verifier. To learn more about the ZK Method read here.`}</p>
        </div>
        <div className="text-right">
          <Button
            variant={ButtonVariant.GRADIENT}
            onClick={onNextClick}
          >{t`Get Started`}</Button>
        </div>
      </div>
    </Card>
  );
}
