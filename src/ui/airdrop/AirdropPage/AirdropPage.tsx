import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { useWeb3React } from "@web3-react/core";

import { ChooseDelegate } from "src/ui/airdrop/ChooseDelegate/ChooseDelegate";
import { StartAirdropCard } from "src/ui/airdrop/StartAirdropCard/StartAirdropCard";
import { AirdropPreview } from "src/ui/airdrop/AirdropPreview/AirdropPreview";
import Steps from "src/ui/base/Steps/Steps";
import { useSigner } from "src/ui/signer/useSigner";
import { t } from "ttag";
import { parseEther } from "ethers/lib/utils";
import { MerkleRewardType, useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import {
  StepItem,
  StepStatus as StepItemStatus,
} from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import { DelegateInstructions } from "src/ui/airdrop/DelegateInstructions/DelegateInstructions";
import { ReviewTransaction } from "src/ui/airdrop/ReviewClaim/ReviewTransaction";
import { AirdropAlreadyClaimed } from "src/ui/airdrop/AirdropAlreadyClaimed/AirdropAlreadyClaimed";
import { ClaimSuccessful } from "src/ui/airdrop/ClaimSuccessful/ClaimSuccessful";
import useRouterSteps, { StepStatus } from "src/ui/router/useRouterSteps";

enum Step {
  /**
   * The greeting screen, user is prompted to connect their wallet before they
   * can continue.
   */
  START_AIRDROP = "start",

  /**
   * User sees their airdrop amount and can continue to learn about delegation.
   */
  AIRDROP_PREVIEW = "preview",

  /**
   * User reads instructions on what delegating is and can continue on to
   * delegate their tokens.
   */
  DELEGATE_INSTRUCTIONS = "instructions",

  /**
   * User selects their delegate and continues on to the delegate their tokens.
   */
  CHOOSE_DELEGATE = "delegate",

  /**
   * User can see their tokens and delegate side-by-side then click CLAIM to
   * create the transaction.
   */
  REVIEW_TRANSACTION = "transaction",

  /**
   * The final screen where users can then go to governance UI or socials.
   */
  DELEGATE_COMPLETE = "complete",

  /**
   * A returning user sees the amount of airdrop they already claimed.
   */
  ALREADY_CLAIMED = "claimed",
}

export default function AirdropPage(): ReactElement {
  const { account, active, library } = useWeb3React();
  const signer = useSigner(account, library);
  const merkleInfoQueryData = useMerkleInfo(
    account?.toLowerCase(),
    MerkleRewardType.RETRO,
  );

  const { data: merkleInfo } = merkleInfoQueryData;
  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);

  const [delegateAddress, setDelegateAddress] = useState<string | undefined>();

  const {
    currentStep,
    canViewStep,
    getStepPath,
    getStepStatus,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  } = useRouterSteps({
    steps: [
      Step.START_AIRDROP,
      Step.AIRDROP_PREVIEW,
      Step.DELEGATE_INSTRUCTIONS,
      Step.CHOOSE_DELEGATE,
      Step.REVIEW_TRANSACTION,
      Step.DELEGATE_COMPLETE,
      Step.ALREADY_CLAIMED,
    ],
  });

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
    <div className="flex w-full max-w-4xl flex-1 flex-col items-center gap-4">
      <Head>
        <title>{t`Element Airdrop | Element Council Protocol`}</title>
      </Head>

      <div className="w-[600px] max-w-full">
        <Steps className="w-full">
          <StepItem
            stepLabel="1"
            status={getStepItemStatus([
              Step.START_AIRDROP,
              Step.AIRDROP_PREVIEW,
            ])}
            href={getStepPath(Step.START_AIRDROP)}
          >{t`View airdrop`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="2"
            status={getStepItemStatus([
              Step.DELEGATE_INSTRUCTIONS,
              Step.CHOOSE_DELEGATE,
            ])}
            href={
              canViewStep(Step.DELEGATE_INSTRUCTIONS)
                ? getStepPath(Step.DELEGATE_INSTRUCTIONS)
                : undefined
            }
          >{t`Choose delegate`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="3"
            status={getStepItemStatus([Step.REVIEW_TRANSACTION])}
            href={
              canViewStep(Step.REVIEW_TRANSACTION)
                ? getStepPath(Step.REVIEW_TRANSACTION)
                : undefined
            }
          >{t`Review Transaction`}</StepItem>
        </Steps>
      </div>

      <div className="w-full">
        {(() => {
          switch (currentStep) {
            case Step.START_AIRDROP:
            default:
              return (
                <StartAirdropCard
                  account={account}
                  library={library}
                  walletConnectionActive={active}
                  onNextStep={() => {
                    if (hasClaimedAirdrop(merkleInfo, claimableBalance)) {
                      goToStep(Step.ALREADY_CLAIMED);
                      return;
                    }
                    goToNextStep();
                  }}
                />
              );

            case Step.ALREADY_CLAIMED:
              return (
                <AirdropAlreadyClaimed account={account} provider={library} />
              );

            case Step.AIRDROP_PREVIEW:
              return (
                <AirdropPreview account={account} onNextStep={goToNextStep} />
              );

            case Step.DELEGATE_INSTRUCTIONS:
              return (
                <DelegateInstructions
                  account={account}
                  onPrevStep={goToPreviousStep}
                  onNextStep={goToNextStep}
                />
              );
            case Step.CHOOSE_DELEGATE:
              return (
                <ChooseDelegate
                  account={account as string}
                  provider={library}
                  onChooseDelegate={setDelegateAddress}
                  onPrevStep={goToPreviousStep}
                  onNextStep={goToNextStep}
                />
              );
            case Step.REVIEW_TRANSACTION:
              return (
                <ReviewTransaction
                  account={account}
                  provider={library}
                  signer={signer}
                  delegateAddress={
                    delegateAddress as string /* safe to cast because users cannot get to this step w/out choosing a delegate first */
                  }
                  onPrevStep={goToPreviousStep}
                  onNextStep={goToNextStep}
                />
              );
            case Step.DELEGATE_COMPLETE:
              return <ClaimSuccessful />;
          }
        })()}
      </div>
    </div>
  );
}

function hasClaimedAirdrop(
  merkleInfo: MerkleProof | undefined,
  claimableBalance: string,
) {
  return merkleInfo && parseEther(claimableBalance).isZero();
}
