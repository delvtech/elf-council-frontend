import { useWeb3React } from "@web3-react/core";
import React, { ReactElement, useState } from "react";
import { ChooseDelegate } from "src/ui/airdrop/ChooseDelegate/ChooseDelegate";
import { StartAirdropCard } from "src/ui/airdrop/StartAirdropCard/StartAirdropCard";
import { AirdropPreview } from "src/ui/airdrop/AirdropPreview/AirdropPreview";
import Steps from "src/ui/base/Steps/Steps";
import { useSigner } from "src/ui/signer/useSigner";
import { t } from "ttag";
import { parseEther } from "ethers/lib/utils";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { StepItem, StepStatus } from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import { DelegateInstructions } from "src/ui/airdrop/DelegateInstructions/DelegateInstructions";
import { ReviewTransaction } from "src/ui/airdrop/ReviewClaim/ReviewTransaction";
import { AirdropAlreadyClaimed } from "src/ui/airdrop/AirdropAlreadyClaimed/AirdropAlreadyClaimed";
import { ClaimSuccessful } from "src/ui/airdrop/ClaimSuccessful/ClaimSuccessful";

enum AirdropSteps {
  /**
   * The greeting screen, user is prompted to connect their wallet before they
   * can continue.
   */
  START_AIRDROP,

  /**
   * User sees their airdrop amount and can continue to learn about delegation.
   */
  AIRDROP_PREVIEW,

  /**
   * User reads instructions on what delegating is and can contine on to
   * delegate their tokens.
   */
  DELEGATE_INSTRUCTIONS,

  /**
   * User selects their delegate and continues on to the delegate their tokens.
   */
  CHOOSE_DELEGATE,

  /**
   * User can see their tokens and delegate side-by-side then click CLAIM to
   * create the transaction.
   */
  REVIEW_TRANSACTION,

  /**
   * The final screen where users can then go to governance UI or socials.
   */
  DELEGATE_COMPLETE,

  /**
   * A returning user sees the amount of airdrop they already claimed.
   */
  ALREADY_CLAIMED,
}

export default function AirdropPage(): ReactElement {
  const { account, active, library } = useWeb3React();
  const signer = useSigner(account, library);
  const merkleInfoQueryData = useMerkleInfo(account);

  const { data: merkleInfo } = merkleInfoQueryData;
  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);

  const [delegateAddress, setDelegateAddress] = useState<string | undefined>();

  // statuses for the Steps component
  const [activeStep, setActiveStep] = useState<AirdropSteps | undefined>();
  const connectWalletStatus = getConnectWalletStatus(account, activeStep);
  const delegateStatus = getDelegateStatus(activeStep);
  const claimAndDelegateStatus = getClaimAndDelegateStatus(activeStep);

  return (
    <div className="flex flex-col items-center flex-1 w-full max-w-4xl gap-12">
      <div className="w-[600px] max-w-full">
        <Steps className="w-full">
          <StepItem
            stepLabel="1"
            status={connectWalletStatus}
          >{t`View airdrop`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="2"
            status={delegateStatus}
          >{t`Choose delegate`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="3"
            status={claimAndDelegateStatus}
          >{t`Review deposit`}</StepItem>
        </Steps>
      </div>

      <div className="w-full">
        {(() => {
          switch (activeStep) {
            case AirdropSteps.START_AIRDROP:
            default:
              return (
                <StartAirdropCard
                  account={account}
                  walletConnectionActive={active}
                  onNextStep={() => {
                    if (hasClaimedAirdrop(merkleInfo, claimableBalance)) {
                      setActiveStep(AirdropSteps.ALREADY_CLAIMED);
                      return;
                    }
                    setActiveStep(AirdropSteps.AIRDROP_PREVIEW);
                  }}
                />
              );

            case AirdropSteps.ALREADY_CLAIMED:
              return <AirdropAlreadyClaimed account={account} />;

            case AirdropSteps.AIRDROP_PREVIEW:
              return (
                <AirdropPreview
                  account={account}
                  onPrevStep={() => setActiveStep(AirdropSteps.START_AIRDROP)}
                  onNextStep={() =>
                    setActiveStep(AirdropSteps.DELEGATE_INSTRUCTIONS)
                  }
                />
              );

            case AirdropSteps.DELEGATE_INSTRUCTIONS:
              return (
                <DelegateInstructions
                  account={account}
                  onPrevStep={() => setActiveStep(AirdropSteps.AIRDROP_PREVIEW)}
                  onNextStep={() => setActiveStep(AirdropSteps.CHOOSE_DELEGATE)}
                />
              );
            case AirdropSteps.CHOOSE_DELEGATE:
              return (
                <ChooseDelegate
                  account={account as string}
                  onChooseDelegate={setDelegateAddress}
                  onPrevStep={() =>
                    setActiveStep(AirdropSteps.DELEGATE_INSTRUCTIONS)
                  }
                  onNextStep={() => {
                    setActiveStep(AirdropSteps.REVIEW_TRANSACTION);
                  }}
                />
              );
            case AirdropSteps.REVIEW_TRANSACTION:
              return (
                <ReviewTransaction
                  account={account}
                  signer={signer}
                  delegateAddress={
                    delegateAddress as string /* safe to cast because users cannot get to this step w/out choosing a delegate first */
                  }
                  onPrevStep={() => setActiveStep(AirdropSteps.CHOOSE_DELEGATE)}
                  onNextStep={() => {
                    setActiveStep(AirdropSteps.DELEGATE_COMPLETE);
                  }}
                />
              );
            case AirdropSteps.DELEGATE_COMPLETE:
              return <ClaimSuccessful />;
          }
        })()}
      </div>
    </div>
  );
}
function getConnectWalletStatus(
  account: string | null | undefined,
  activeStep: AirdropSteps | undefined,
): StepStatus {
  if (account) {
    return StepStatus.COMPLETE;
  }
  if (activeStep === AirdropSteps.START_AIRDROP) {
    return StepStatus.COMPLETE;
  }
  return StepStatus.UPCOMING;
}

function getDelegateStatus(activeStep: AirdropSteps | undefined): StepStatus {
  if (
    activeStep === undefined ||
    [AirdropSteps.START_AIRDROP, AirdropSteps.AIRDROP_PREVIEW].includes(
      activeStep,
    )
  ) {
    return StepStatus.UPCOMING;
  }

  if (
    [AirdropSteps.DELEGATE_INSTRUCTIONS, AirdropSteps.CHOOSE_DELEGATE].includes(
      activeStep,
    )
  ) {
    return StepStatus.CURRENT;
  }

  return StepStatus.COMPLETE;
}

function getClaimAndDelegateStatus(
  activeStep: AirdropSteps | undefined,
): StepStatus {
  if (!activeStep) {
    return StepStatus.UPCOMING;
  }

  if (
    [AirdropSteps.ALREADY_CLAIMED, AirdropSteps.DELEGATE_COMPLETE].includes(
      activeStep,
    )
  ) {
    return StepStatus.COMPLETE;
  }

  if (activeStep === AirdropSteps.REVIEW_TRANSACTION) {
    return StepStatus.CURRENT;
  }

  return StepStatus.UPCOMING;
}

function hasClaimedAirdrop(
  merkleInfo: MerkleProof | undefined,
  claimableBalance: string,
) {
  return merkleInfo && parseEther(claimableBalance).isZero();
}
