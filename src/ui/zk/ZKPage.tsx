import React, { ReactElement, useEffect, useState } from "react";
import IntroCard from "./IntroCard";
import EncryptionCard from "./EncryptionCard";
import ShareCard from "./ShareCard";
import { Platform } from "./types";
import useRouterSteps from "src/ui/router/useRouterSteps";
import { utils } from "ethers";
import { StepItem, StepStatus } from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import Steps from "src/ui/base/Steps/Steps";
import { ElementLogo } from "src/ui/base/ElementLogo";
import Image from "next/image";
import { t } from "ttag";

interface ZKPageProps {
  platform: Platform;
}

export default function ZKPage({ platform }: ZKPageProps): ReactElement {
  const [keySecretPair, setKeySecretPair] = useState<[string, string]>();
  const [publicId, setPublicId] = useState<string>();
  const {
    currentStep,
    completeStep,
    goToNextStep,
    goToPreviousStep,
    getStepPath,
    canViewStep,
  } = useRouterSteps({ initialCompleted: 1 });

  useEffect(() => {
    if (keySecretPair) {
      // TODO: Integrate a16z zk lib's petersonHash fn
      setPublicId(utils.id(keySecretPair.join("")));
    }
  }, [keySecretPair]);

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

  return (
    <div className="flex flex-col items-center flex-1 w-full max-w-4xl gap-12">
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
      <IntroCard className={getStepClassName(1)} onNextClick={goToNextStep} />

      {/* STEP 2 */}
      <EncryptionCard
        className={getStepClassName(2)}
        onComplete={() => completeStep(2)}
        onGenerated={setKeySecretPair}
        onBackClick={goToPreviousStep}
        onNextClick={goToNextStep}
      />

      {/* STEP 3 */}
      {platform === Platform.DISCORD && (
        <ShareCard
          publicId={publicId as string}
          className={getStepClassName(3)}
          label="Discord"
          url="https://element.fi/discord"
          icon={
            <Image
              width={24}
              height={24}
              src="/assets/discordlogo--light.svg"
              alt=""
            />
          }
          description={
            <>
              {t`Send your new Public ID in our `}
              <a
                href="https://element.fi/discord"
                target="_blank"
                rel="noreferrer"
                className="text-yieldLightBlue"
              >{t`Discord channel`}</a>
              {t` to associate it with your Discord username.`}
            </>
          }
        />
      )}
      {platform === Platform.GITHUB && (
        <ShareCard
          publicId={publicId as string}
          className={getStepClassName(3)}
          label="GitHub"
          url="https://github.com/element-fi/elf-council-frontend/issues/384"
          icon={
            <Image
              width={24}
              height={24}
              src="/assets/githublogo--light.svg"
              alt=""
            />
          }
          description={
            <>
              {t`Share your new Public ID in a comment on our `}
              <a
                href="https://github.com/element-fi/elf-council-frontend/issues/384"
                target="_blank"
                rel="noreferrer"
                className="text-yieldLightBlue"
              >{t`GitHub issue`}</a>
              {t` to associate it with your GitHub username.`}
            </>
          }
        />
      )}

      <div className="flex flex-col items-center flex-1 mt-auto text-principalRoyalBlue">
        <span className="text-sm">{t`Powered by`}</span>
        <ElementLogo height={"40"} />
      </div>
    </div>
  );
}
