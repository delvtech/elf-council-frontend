import React, { ReactElement, useEffect, useState } from "react";
import useRouterSteps from "src/ui/router/useRouterSteps";
import { ElementLogo } from "src/ui/base/ElementLogo";
import { t } from "ttag";
import { utils } from "ethers";
import ClaimCard from "./ClaimCard";
import ZKData from "src/ui/zk/ZKData";
import SuccessCard from "./SuccessCard";
import ErrorCard from "./ErrorCard";

export default function ClaimPage(): ReactElement {
  const { currentStep, completeStep, goToNextStep, goToPreviousStep } =
    useRouterSteps();
  const [data, setData] = useState<ZKData>();
  const [publicId, setPublicId] = useState<string>();

  useEffect(() => {
    // TODO: get public ID with data
    if (
      data?.privateKey ===
      "0x321718eb3db448ca864758c7cc54fd72e7a88b982a308f07b16d156fe6592e37"
    ) {
      setPublicId(utils.id(`${data.privateKey}${data.secret}`));
    } else {
      setPublicId(undefined);
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
    <div className="flex flex-col items-center flex-1 max-w-4xl gap-12">
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
        <ErrorCard
          onTryAgain={goToPreviousStep}
          className={getStepClassName(2)}
        />
      )}

      <div className="flex flex-col items-center flex-1 mt-auto text-principalRoyalBlue">
        <span className="text-sm">{t`Powered by`}</span>
        <ElementLogo height={"40"} />
      </div>
    </div>
  );
}
