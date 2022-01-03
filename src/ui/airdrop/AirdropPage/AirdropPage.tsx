import { useWeb3React } from "@web3-react/core";
import React, { ReactElement, useState } from "react";
import tw, {
  display,
  flexDirection,
  alignItems,
  margin,
  fontSize,
  textColor,
  flex,
} from "src/elf-tailwindcss-classnames";
import { ChooseDelegate } from "src/ui/airdrop/ChooseDelegate/ChooseDelegate";
import { StartClaimingCard } from "src/ui/airdrop/AirdropPage/StartClaimingCard";
import { AirdropPreview } from "src/ui/airdrop/AirdropPreview/AirdropPreview";
import Steps from "src/ui/base/Steps/Steps";
import { ElementLogo } from "src/ui/base/ElementLogo";
import { useSigner } from "src/ui/signer/useSigner";
import { t } from "ttag";
import { parseEther } from "ethers/lib/utils";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { StepItem, StepStatus } from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import { DelegateInstructions } from "src/ui/airdrop/DelegateInstructions/DelegateInstructions";
import { ReviewClaim } from "src/ui/airdrop/ReviewClaim/ReviewClaim";
import { AirdropAlreadyClaimed } from "src/ui/airdrop/AirdropAlreadyClaimed/AirdropAlreadyClaimed";

enum AirdropSteps {
  /**
   * The greeting screen, user is prompted to connect their wallet before they
   * can continue.
   */
  START_CLAIMING,

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
  CLAIM_AND_DELEGATE_PREVIEW,

  /**
   * The final screen where users can then go to governance UI or socials.
   */
  CLAIM_COMPLETE,

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
  const claimAndDelegateStatus = getClaimAndDelegateStatus(
    activeStep,
    merkleInfo,
    claimableBalance,
  );

  return (
    <div className="flex flex-col space-y-8 w-full justify-center items-center">
      <div className="w-[600px]">
        <Steps className="w-full">
          <StepItem
            stepLabel="1"
            status={connectWalletStatus}
          >{t`Connect wallet`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="2"
            status={delegateStatus}
          >{t`Delegate`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="3"
            status={claimAndDelegateStatus}
          >{t`Claim and delegate`}</StepItem>
        </Steps>
      </div>

      <div className="w-full md:w-3/5 h-full">
        {(() => {
          switch (activeStep) {
            case AirdropSteps.START_CLAIMING:
            default:
              return (
                <StartClaimingCard
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
                  onPrevStep={() => setActiveStep(AirdropSteps.START_CLAIMING)}
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
                  onChooseDelegate={setDelegateAddress}
                  onPrevStep={() =>
                    setActiveStep(AirdropSteps.DELEGATE_INSTRUCTIONS)
                  }
                  onNextStep={() => {
                    setActiveStep(AirdropSteps.CLAIM_AND_DELEGATE_PREVIEW);
                  }}
                />
              );
            case AirdropSteps.CLAIM_AND_DELEGATE_PREVIEW:
              return (
                <ReviewClaim
                  account={account}
                  signer={signer}
                  delegateAddress={
                    delegateAddress as string /* safe to cast because users cannot get to this step w/out choosing a delegate first */
                  }
                  onPrevStep={() => setActiveStep(AirdropSteps.CHOOSE_DELEGATE)}
                  onNextStep={() => {
                    setActiveStep(AirdropSteps.CLAIM_AND_DELEGATE_PREVIEW);
                  }}
                />
              );
          }
        })()}
      </div>
      <div
        className={tw(
          display("flex"),
          flex("flex-1"),
          flexDirection("flex-col"),
          alignItems("items-center"),
          margin("mt-auto"),
          textColor("text-principalRoyalBlue"),
        )}
      >
        <span className={fontSize("text-sm")}>{t`Powered by`}</span>
        <ElementLogo height={"40"} />
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
  if (activeStep === AirdropSteps.START_CLAIMING) {
    return StepStatus.COMPLETE;
  }
  return StepStatus.UPCOMING;
}

function getDelegateStatus(activeStep: AirdropSteps | undefined): StepStatus {
  if (
    activeStep === undefined ||
    [AirdropSteps.START_CLAIMING, AirdropSteps.AIRDROP_PREVIEW].includes(
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
  merkleInfo: MerkleProof | undefined,
  claimableBalance: string,
): StepStatus {
  if (
    activeStep === AirdropSteps.CLAIM_AND_DELEGATE_PREVIEW &&
    hasClaimedAirdrop(merkleInfo, claimableBalance)
  ) {
    return StepStatus.COMPLETE;
  }
  if (activeStep === AirdropSteps.CLAIM_AND_DELEGATE_PREVIEW) {
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
