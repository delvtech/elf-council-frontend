import React, { ReactElement, useCallback, useEffect, useState } from "react";
import useRouterSteps from "src/ui/router/useRouterSteps";
import { ElementLogo } from "src/ui/base/ElementLogo";
import { t } from "ttag";
import { utils } from "ethers";
import LookupCard from "./LookupCard";
import ZKData from "src/ui/zk/ZKData";
import ClaimCard from "./ClaimCard";
import AlreadyClaimedCard from "./AlreadyClaimedCard";
import ErrorCard from "./ErrorCard";

export default function ClaimPage(): ReactElement {
  const { currentStep, completeStep, goToNextStep, goToPreviousStep } =
    useRouterSteps();
  const [data, setData] = useState<ZKData>();
  const [publicId, setPublicId] = useState<string>();
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  useEffect(() => {
    // TODO: get public ID with data
    const placeholderSuccessKey =
      "0x321718eb3db448ca864758c7cc54fd72e7a88b982a308f07b16d156fe6592e37";
    if (data?.privateKey === placeholderSuccessKey) {
      setPublicId(utils.id(`${data.privateKey}${data.secret}`));
      setAlreadyClaimed(false);
    } else {
      setPublicId(undefined);
    }

    // TODO: check if already claimed
    const placeholderClaimedKey =
      "0x181a6585d99fdd4a22d02d1609d4d2a5498777523560905a3c069fd6f61feb1a";
    if (data?.privateKey === placeholderClaimedKey) {
      setPublicId(utils.id(`${data.privateKey}${data.secret}`));
      setAlreadyClaimed(true);
    }
  }, [data]);

  const handleStep1Complete = useCallback(
    (data: ZKData): void => {
      setData(data);
      completeStep(1);
    },
    [completeStep],
  );

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
      <LookupCard
        className={getStepClassName(1)}
        onComplete={handleStep1Complete}
        onNextClick={goToNextStep}
      />

      {/* STEP 2 */}
      {publicId && !alreadyClaimed && (
        <ClaimCard className={getStepClassName(2)} />
      )}
      {publicId && alreadyClaimed && (
        <AlreadyClaimedCard className={getStepClassName(2)} />
      )}
      {!publicId && (
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
