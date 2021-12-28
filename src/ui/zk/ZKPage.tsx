import React, { ReactElement, useEffect, useState } from "react";
import IntroCard from "./IntroCard";
import EncryptionCard from "./EncryptionCard";
import SuccessCard from "./SuccessCard";
import useRouterSteps from "src/ui/router/useRouterSteps";
import generateHash from "src/base/generateHash";
import { StepItem, StepStatus } from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import Steps from "src/ui/base/Steps/Steps";
import { ElementLogo } from "src/ui/base/ElementLogo";
import { t } from "ttag";

export default function ZKPage(): ReactElement {
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
    if (keySecretPair) setPublicId(generateHash(...keySecretPair));
  }, [keySecretPair]);

  // TODO: transition styles
  const getStepClassName = (step: number) =>
    step > currentStep
      ? "hidden" // upcoming step
      : step < currentStep
      ? "hidden" // completed step
      : "block"; // current step

  const getStepStatus = (step: number): StepStatus =>
    step > currentStep
      ? StepStatus.UPCOMING
      : step < currentStep
      ? StepStatus.COMPLETE
      : StepStatus.CURRENT;

  return (
    <div className="max-w-4xl w-full flex-1 flex flex-col gap-12 items-center">
      <div style={{ width: 600, maxWidth: '100%' }}>
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
      <SuccessCard
        publicId={publicId as string}
        className={getStepClassName(3)}
      />
      <div className="flex flex-1 flex-col items-center mt-auto text-principalRoyalBlue">
        <span className="text-sm">{t`Powered by`}</span>
        <ElementLogo height={"40"} />
      </div>
    </div>
  );
}
