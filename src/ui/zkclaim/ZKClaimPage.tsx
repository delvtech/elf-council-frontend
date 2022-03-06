import React, { ReactElement, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import LookupCard from "./LookupCard";
import EligibleCard from "./EligibleCard";
import AlreadyClaimedCard from "./AlreadyClaimedCard";
import NotEligibleCard from "./NotEligibleCard";
import DelegateInfoCard from "./DelegateInfoCard";
import ChooseDelegateCard from "./ChooseDelegateCard";
import TransactionCard from "./TransactionCard";
import ShareCard from "./ShareCard";
import useZKProof from "./useZKProof";
import { useSigner } from "src/ui/signer/useSigner";
import useRouterSteps, { StepStatus } from "src/ui/router/useRouterSteps";
import { ElementLogo } from "src/ui/base/ElementLogo/ElementLogo";
import {
  StepItem,
  StepStatus as StepItemStatus,
} from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import Steps from "src/ui/base/Steps/Steps";
import { t } from "ttag";

export enum Step {
  LOOKUP = "lookup",
  ELIGIBILITY = "eligibility",
  DELEGATE_INFO = "info",
  DELEGATE = "delegate",
  TRANSACTION = "transaction",
  SHARE = "share",
}

export default function ClaimPage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);

  const [keySecretPair, setKeySecretPair] = useState<[string, string]>();
  const key = keySecretPair?.[0];
  const secret = keySecretPair?.[1];
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [delegateAddress, setDelegateAddress] = useState<string>();
  const {
    generate: generateProof,
    proof,
    isEligible,
    isReady,
    error: proofError,
    isGenerating,
  } = useZKProof({
    key,
    secret,
    account: account || undefined,
  });

  const {
    canViewStep,
    getStepPath,
    getStepStatus,
    goToNextStep,
    goToPreviousStep,
  } = useRouterSteps({
    steps: [
      Step.LOOKUP,
      Step.ELIGIBILITY,
      Step.DELEGATE_INFO,
      Step.DELEGATE,
      Step.TRANSACTION,
      Step.SHARE,
    ],
  });

  // TODO: transition styles
  const getStepClassName = (step: Step) => {
    switch (getStepStatus(step)) {
      case StepStatus.CURRENT:
        return "block";
      default:
        return "hidden";
    }
  };

  const getStepItemStatus = (steps: Step[]): StepItemStatus => {
    const statuses = steps.map((step) => getStepStatus(step));
    if (statuses.includes(StepStatus.CURRENT)) {
      return StepItemStatus.CURRENT;
    }
    if (statuses.includes(StepStatus.PENDING)) {
      return StepItemStatus.PENDING;
    }
    return StepItemStatus.COMPLETE;
  };

  return (
    <div className="flex max-w-4xl flex-1 flex-col items-center gap-6">
      <div style={{ width: 600, maxWidth: "100%" }}>
        <Steps className="w-full">
          <StepItem
            stepLabel="1"
            status={getStepItemStatus([Step.LOOKUP, Step.ELIGIBILITY])}
            href={getStepPath(Step.LOOKUP)}
          >{t`View Airdrop`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="2"
            status={getStepItemStatus([Step.DELEGATE_INFO, Step.DELEGATE])}
            href={
              canViewStep(Step.DELEGATE_INFO)
                ? getStepPath(Step.DELEGATE_INFO)
                : undefined
            }
          >{t`Choose Delegate`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="3"
            status={getStepItemStatus([Step.TRANSACTION])}
            href={
              canViewStep(Step.TRANSACTION)
                ? getStepPath(Step.TRANSACTION)
                : undefined
            }
          >{t`Review Transaction`}</StepItem>
        </Steps>
      </div>

      {/* Lookup */}
      <LookupCard
        className={getStepClassName(Step.LOOKUP)}
        onChange={setKeySecretPair}
        onNextStep={goToNextStep}
      />

      {/* Eligibility */}
      {!isEligible ? (
        <NotEligibleCard
          onTryAgain={goToPreviousStep}
          className={getStepClassName(Step.ELIGIBILITY)}
        />
      ) : alreadyClaimed ? (
        <AlreadyClaimedCard className={getStepClassName(Step.ELIGIBILITY)} />
      ) : (
        <EligibleCard
          className={getStepClassName(Step.ELIGIBILITY)}
          onPreviousStep={goToPreviousStep}
          onNextStep={goToNextStep}
        />
      )}

      {/* Delegation Information */}
      <DelegateInfoCard
        className={getStepClassName(Step.DELEGATE_INFO)}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
      />

      {/* Delegate */}
      <ChooseDelegateCard
        account={account as string}
        className={getStepClassName(Step.DELEGATE)}
        onChooseDelegate={setDelegateAddress}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
      />

      {/* Review & Initiate Transaction */}
      {delegateAddress && (
        <TransactionCard
          className={getStepClassName(Step.TRANSACTION)}
          account={account || undefined}
          signer={signer || undefined}
          delegateAddress={delegateAddress}
          onPreviousStep={goToPreviousStep}
          onSuccess={goToNextStep}
          onNextStep={goToNextStep}
        />
      )}

      {/* Share */}
      <ShareCard className={getStepClassName(Step.SHARE)} />

      <div className="mt-auto flex flex-1 flex-col items-center text-principalRoyalBlue">
        <span className="text-sm">{t`Powered by`}</span>
        <ElementLogo height={"40"} />
      </div>
    </div>
  );
}
