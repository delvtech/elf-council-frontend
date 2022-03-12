import React, { ReactElement, useState } from "react";
import IntroCard from "./IntroCard";
import EncryptionCard from "./EncryptionCard";
import GitHubShareCard from "./GitHubShareCard";
import DiscordShareCard from "./DiscordShareCard";
import { Platform, ZKData } from "./types";
import useRouterSteps, { StepStatus } from "src/ui/router/useRouterSteps";
import {
  StepItem,
  StepStatus as StepItemStatus,
} from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import Steps from "src/ui/base/Steps/Steps";
import { ElementLogo } from "src/ui/base/svg/ElementLogo/ElementLogo";
import { t } from "ttag";

interface ZKPageProps {
  platform: Platform;
}

export default function ZKPage({ platform }: ZKPageProps): ReactElement {
  const [publicId, setPublicId] = useState<string>();
  const {
    goToNextStep,
    goToPreviousStep,
    getStepPath,
    canViewStep,
    getStepStatus,
  } = useRouterSteps();

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
    switch (getStepStatus(step)) {
      case StepStatus.CURRENT:
        return "block";
      default:
        return "hidden";
    }
  };

  const getStepItemStatus = (step: number): StepItemStatus => {
    switch (getStepStatus(step)) {
      case StepStatus.COMPLETE:
        return StepItemStatus.COMPLETE;
      case StepStatus.PENDING:
        return StepItemStatus.PENDING;
      default:
        return StepItemStatus.CURRENT;
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-1 flex-col items-center gap-12">
      <div style={{ width: 600, maxWidth: "100%" }}>
        <Steps className="w-full">
          <StepItem
            stepLabel="1"
            status={getStepItemStatus(1)}
            href={getStepPath(1)}
          >{t`Get Started`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="2"
            status={getStepItemStatus(2)}
            href={canViewStep(2) ? getStepPath(2) : undefined}
          >{t`Encryption`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="3"
            status={getStepItemStatus(3)}
            href={canViewStep(3) ? getStepPath(3) : undefined}
          >{t`Share Public ID`}</StepItem>
        </Steps>
      </div>
      {/* STEP 1 */}
      <IntroCard
        className={getStepClassName(1)}
        onNextStep={goToNextStep}
        platformName={platformName}
      />

      {/* STEP 2 */}
      <EncryptionCard
        className={getStepClassName(2)}
        platform={platform}
        onDownloaded={(data: ZKData) => setPublicId(data.publicId)}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
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
