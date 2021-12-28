import React, { ReactElement, useEffect, useState } from "react";
import useRouterSteps from "src/ui/router/useRouterSteps";
import { ElementLogo } from "src/ui/base/ElementLogo";
import { t } from "ttag";
import ClaimCard from "./ClaimCard";
import ZKData from "src/ui/zk/ZKData";
import SuccessCard from "./SuccessCard";
import ErrorCard from "./ErrorCard";
import generateHash from "src/base/generateHash";

export default function ClaimPage(): ReactElement {
  const { currentStep, completeStep, goToNextStep, goToPreviousStep } = useRouterSteps();
  const [data, setData] = useState<ZKData>();
  const [publicId, setPublicId] = useState<string>();

  useEffect(() => {
    // TODO: get public ID with data
    if (data?.privateKey === "0x954DdDA943D3daF8E0F7B8A6aC1fC8b7ca930150") {
      setPublicId(generateHash());
    } else {
      setPublicId(undefined)
    }
  }, [data]);

  const handleStep1Complete = ([privateKey, secret]: string[]): void => {
    setData({ privateKey, secret });
    completeStep(1);
  };

  // TODO: transition styles
  const getStepClassName = (step: number) =>
    step > currentStep
      ? "hidden" // upcoming step
      : step < currentStep
      ? "hidden" // completed step
      : "block"; // current step

  return (
    <div className="max-w-4xl flex-1 flex flex-col gap-12 items-center">
      {/* STEP 1 */}
      <ClaimCard
        className={getStepClassName(1)}
        onComplete={handleStep1Complete}
        onNextClick={goToNextStep}
      />

      {/* STEP 2 */}
      {publicId ? (
        <SuccessCard className={getStepClassName(2)} />
      ) : (
        <ErrorCard onTryAgain={goToPreviousStep} className={getStepClassName(2)} />
      )}

      <div className="flex flex-1 flex-col items-center mt-auto text-principalRoyalBlue">
        <span className="text-sm">{t`Powered by`}</span>
        <ElementLogo height={"40"} />
      </div>
    </div>
  );
}
