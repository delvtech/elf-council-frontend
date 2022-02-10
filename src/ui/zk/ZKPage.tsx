import React, { ReactElement, useState } from "react";
import IntroCard from "./IntroCard";
import EncryptionCard from "./EncryptionCard";
import GitHubShareCard from "./GitHubShareCard";
import DiscordShareCard from "./DiscordShareCard";
import { Platform } from "./types";
import useRouterSteps from "src/ui/router/useRouterSteps";
import { StepItem, StepStatus } from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import Steps from "src/ui/base/Steps/Steps";
import { ElementLogo } from "src/ui/base/ElementLogo/ElementLogo";
import { t } from "ttag";
import { pedersenHashConcat, toHex } from "zkp-merkle-airdrop-lib";

interface ZKPageProps {
  platform: Platform;
}

export default function ZKPage({ platform }: ZKPageProps): ReactElement {
  const [keySecretPair, setKeySecretPair] = useState<[string, string]>();
  const key = keySecretPair?.[0];
  const secret = keySecretPair?.[1];
  const [publicId, setPublicId] = useState<string>();
  const {
    currentStep,
    completeStep,
    goToNextStep,
    goToPreviousStep,
    getStepPath,
    canViewStep,
  } = useRouterSteps({ initialCompleted: 1 });

  let platformName = "";
  switch (platform) {
    case Platform.DISCORD:
      platformName = "Discord";
      break;
    case Platform.GITHUB:
      platformName = "GitHub";
      break;
  }

  // TODO: transition styles
  const getStepClassName = (step: number) => {
    if (step > currentStep) {
      // upcoming
      return "hidden";
    }
    if (step < currentStep) {
      // completed
      return "hidden";
    }
    // current
    return "block";
  };

  const getStepStatus = (step: number): StepStatus => {
    if (step > currentStep) {
      return StepStatus.UPCOMING;
    }
    if (step < currentStep) {
      return StepStatus.COMPLETE;
    }
    return StepStatus.CURRENT;
  };

  const handleEncryptionStepComplete = () => {
    if (key && secret) {
      const commit = pedersenHashConcat(BigInt(key), BigInt(secret));
      setPublicId(toHex(commit));
      completeStep(2);
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-1 flex-col items-center gap-12">
      <div style={{ width: 600, maxWidth: "100%" }}>
        <Steps className="w-full">
          <StepItem
            stepLabel="1"
            status={getStepStatus(1)}
            href={getStepPath(1)}
          >{t`Get Started`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="2"
            status={getStepStatus(2)}
            href={canViewStep(2) ? getStepPath(2) : undefined}
          >{t`Encryption`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="3"
            status={getStepStatus(3)}
            href={canViewStep(3) ? getStepPath(3) : undefined}
          >{t`Share Public ID`}</StepItem>
        </Steps>
      </div>
      {/* STEP 1 */}
      <IntroCard
        className={getStepClassName(1)}
        onNextClick={goToNextStep}
        platformName={platformName}
      />

      {/* STEP 2 */}
      <EncryptionCard
        className={getStepClassName(2)}
        onComplete={handleEncryptionStepComplete}
        onGenerated={setKeySecretPair}
        onBackClick={goToPreviousStep}
        onNextClick={goToNextStep}
      />

      {/* STEP 3 */}
      {platform === Platform.DISCORD && publicId && (
        <DiscordShareCard className={getStepClassName(3)} publicId={publicId} />
      )}
      {platform === Platform.GITHUB && publicId && (
        <GitHubShareCard className={getStepClassName(3)} publicId={publicId} />
      )}

      <div className="mt-auto flex flex-1 flex-col items-center text-principalRoyalBlue">
        <span className="text-sm">{t`Powered by`}</span>
        <ElementLogo height={"40"} />
      </div>
    </div>
  );
}
