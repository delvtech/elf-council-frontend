import { useWeb3React } from "@web3-react/core";
import React, { ReactElement, useState } from "react";
import tw, {
  display,
  flexDirection,
  height,
  space,
  width,
  justifyContent,
  alignItems,
  margin,
  fontSize,
  textColor,
  flex,
} from "src/elf-tailwindcss-classnames";
import { DelegateStepCard } from "src/ui/airdrop/AirdropPage/DelegateStepCard";
import { StartClaimingCard } from "src/ui/airdrop/AirdropPage/StartClaimingCard";
import { ViewAirdropStepCard } from "src/ui/airdrop/AirdropPage/ViewAirdropStepCard";
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

export default function AirdropPage(): ReactElement {
  const { account, active, library } = useWeb3React();
  const signer = useSigner(account, library);
  const merkleInfoQueryData = useMerkleInfo(account);

  const { data: merkleInfo } = merkleInfoQueryData;
  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);

  const [activeStepIndex, setActiveStepIndex] = useState<number | undefined>();

  let connectWalletStatus: StepStatus = "upcoming";
  if (account) {
    connectWalletStatus = "complete";
  } else if (activeStepIndex === 0) {
    connectWalletStatus = "current";
  }

  const delegateStatus =
    activeStepIndex === 1
      ? "current"
      : activeStepIndex === 2
      ? "complete"
      : "upcoming";

  const claimAndDelegateStatus =
    activeStepIndex === 2 && hasClaimedAirdrop(merkleInfo, claimableBalance)
      ? "complete"
      : activeStepIndex === 2
      ? "current"
      : "upcoming";

  return (
    <div
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        space("space-y-8"),
        width("w-full"),
        justifyContent("justify-center"),
        alignItems("items-center"),
      )}
    >
      <div style={{ width: 600 }}>
        <Steps className={width("w-full")}>
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

      <div className={tw(width("w-full", "md:w-3/5"), height("h-full"))}>
        {activeStepIndex === 0 || activeStepIndex === undefined ? (
          <StartClaimingCard
            account={account}
            walletConnectionActive={active}
            onNextStep={() => {
              // user has no airdrop if they have a merkle value but have already claimed
              // the full amount
              if (hasClaimedAirdrop(merkleInfo, claimableBalance)) {
                setActiveStepIndex(2);
                return;
              }
              setActiveStepIndex(1);
            }}
          />
        ) : null}
        {activeStepIndex === 1 ? (
          <ViewAirdropStepCard
            account={account}
            onNextStep={() => setActiveStepIndex(2)}
          />
        ) : null}
        {activeStepIndex === 2 ? (
          <DelegateStepCard signer={signer} account={account} />
        ) : null}
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
function hasClaimedAirdrop(
  merkleInfo: MerkleProof | undefined,
  claimableBalance: string,
) {
  return merkleInfo && parseEther(claimableBalance).isZero();
}
