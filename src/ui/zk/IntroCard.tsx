import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import H3 from "src/ui/base/H3/H3";
import { t, jt } from "ttag";

const learnMoreHereLink = (
  <a
    key="learnMoreHereLink"
    href="https://github.com/a16z/zkp-merkle-airdrop-contracts"
    target="_blank"
    rel="noreferrer"
    className="text-yieldLightBlue"
  >
    {t`learn more about the ZKP airdrop method here`}
  </a>
);

interface IntroCardProps {
  className?: string;
  onNextStep: () => void;
  platformName: string;
}

export default function IntroCard({
  className,
  onNextStep,
  platformName,
}: IntroCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="p-2 text-white sm:px-6 sm:py-4">
        <h1 className="mb-4 text-4xl font-semibold text-white">{t`${platformName} Airdrop`}</h1>
        <p>{jt`This airdrop utilizes a method named Zero Knowledge Proof that allows you to claim participation in the governance system based on your ${platformName} ID without revealing any personal information. You can ${learnMoreHereLink}.`}</p>
        <H2 className="mt-4 text-2xl text-white">{t`How does it work?`}</H2>
        <div className="mt-6 mb-6 flex flex-col gap-2 rounded-lg bg-white/10 px-5 py-4 sm:py-6 sm:px-8">
          <H3 className="text-white">{t`1. Generate your Key, Secret, & Public ID.`}</H3>
          <p>{t`Use your cursor to randomly generate a new Key and Secret pair which you'll download for later use, then get a Public ID derived from your Key and Secret.`}</p>
          <H3 className="mt-4 text-white">{t`2. Share your new Public ID on ${platformName}.`}</H3>
          <p>{t`Share your new Public ID on ${platformName} to associate it with your  ${platformName} ID.`}</p>
          <H3 className="mt-4 text-white">{t`3. Check your eligibility.`}</H3>
          <p>{t`A new link will be shared on April 6, 2022 where you'll check if your ${platformName} ID was eligible by entering your Key and Secret.`}</p>
        </div>
        <div className="text-right">
          <Button
            variant={ButtonVariant.GRADIENT}
            onClick={onNextStep}
          >{t`Get Started`}</Button>
        </div>
      </div>
    </Card>
  );
}
