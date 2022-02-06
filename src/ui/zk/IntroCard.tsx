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
  onNextClick: () => void;
  platformName: string;
}

export default function IntroCard({
  className,
  onNextClick,
  platformName,
}: IntroCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="p-2 text-white sm:p-6">
        <h1 className="mb-4 text-4xl font-semibold text-white">{t`ZKP ${platformName} Airdrop`}</h1>
        <p>{jt`The ZKP method allows you claim participation in our governance system based on your ${platformName} ID without revealing any personal information. You can ${learnMoreHereLink}.`}</p>
        <H2 className="mt-4 text-2xl text-white">{t`How does it work?`}</H2>
        <div className="flex flex-col gap-2 px-5 py-4 mt-6 mb-6 rounded-lg sm:py-6 sm:px-8 bg-white/10">
          <H3 className="mt-2 text-white">{t`Generate your Key, Secret, & Public ID.`}</H3>
          <p>{t`Use your cursor to randomly generate a new Key and Secret pair which you'll download for later use, then get a Public ID derived from your Key and Secret.`}</p>
          <H3 className="mt-4 text-white">{t`Share your new Public ID on ${platformName}.`}</H3>
          <p>{t`Share your new Public ID on ${platformName} to associate it with your  ${platformName} ID.`}</p>
          <H3 className="mt-4 text-white">{t`Check your eligibility.`}</H3>
          <p>{t`After 30 days of Public ID collection, a new link will be shared where you'll check if your  ${platformName} ID was elligible by entering your Key and Secret.`}</p>
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
