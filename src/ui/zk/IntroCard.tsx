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
          <p>{t`The Public ID is created using two components, The Private Key and
         The Secret. Both are strings randomly created by using ZK Method.`}</p>
          <H2 className="mt-4 text-white">{t`What is ZK Method?`}</H2>
          <p>{t`ZK is an encryptation process that hide your Public Address 
        provides you a new one to interact with Element Governance platform and 
        protocol access.`}</p>
          <H2 className="mt-4 text-white">{t`Why do I need Public ID?`}</H2>
          <p>{t`With the launch of the $ELFI and the DAO, we want provide unique 
        Private Keys to give an extra layer of security. Please keep it in a 
        safe place. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur 
        aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione
         voluptatem sequi nesciunt, neque porro quisquam est`}</p>
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
