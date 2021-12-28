import classNames from "classnames";
import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2";
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
      <div className="p-2 sm:p-6 text-white">
        <h1 className="text-white text-3xl font-semibold mb-4">{t`Claiming`}</h1>
        <div
          className={classNames(
            "rounded-lg py-4 sm:py-6 px-5 sm:px-8 flex flex-col gap-2 mb-6",
            // eslint-disable-next-line tailwindcss/no-custom-classname
            classNames("bg-white/10"),
          )}
        >
          <H2 className="text-white">{t`Creating your Public ID`}</H2>
          <p>{t`The Public ID is created using two components, The Private Key and
         The Secret. Both are strings randomly created by using ZK Method.`}</p>
          <H2 className="text-white mt-4">{t`What is ZK Method?`}</H2>
          <p>{t`ZK is an encryptation process that hide your Public Address 
        provides you a new one to interact with Element Governance platform and 
        protocol access.`}</p>
          <H2 className="text-white mt-4">{t`Why do I need Public ID?`}</H2>
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
