import { useWeb3React } from "@web3-react/core";
import React, { ReactElement, ReactNode, useMemo, useState } from "react";
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
import { Step, StepStatus } from "src/ui/base/Steps/step";
import { parseEther } from "ethers/lib/utils";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { MerkleProof } from "src/elf/merkle/MerkleProof";

interface StepWithContent extends Step {
  content: ReactNode;
}

export default function AirdropPage(): ReactElement {
  const { account, active, library } = useWeb3React();
  const signer = useSigner(account, library);
  const merkleInfoQueryData = useMerkleInfo(account);

  const { data: merkleInfo } = merkleInfoQueryData;
  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);

  const [activeStepIndex, setActiveStepIndex] = useState<number | undefined>();

  const steps: StepWithContent[] = useMemo(() => {
    let connectWalletStatus: StepStatus = "upcoming";
    if (account) {
      connectWalletStatus = "complete";
    } else if (activeStepIndex === 0) {
      connectWalletStatus = "current";
    }
    return [
      {
        name: t`Connect wallet`,
        status: connectWalletStatus,
        content: (
          <StartClaimingCard
            account={account}
            walletConnectionActive={active}
            onNextStep={() => {
              // user has no airdrop if they have a merkle value but have already claimed
              // the full amount
              if (hasClaimedAirdrop(merkleInfo, claimableBalance)) {
                return setActiveStepIndex(2);
              }
              setActiveStepIndex(1);
            }}
          />
        ),
      },
      {
        name: t`Delegate`,
        status:
          activeStepIndex === 1
            ? "current"
            : activeStepIndex === 2
            ? "complete"
            : "upcoming",
        content: (
          <ViewAirdropStepCard
            account={account}
            onNextStep={() => setActiveStepIndex(2)}
          />
        ),
      },
      {
        name: t`Claim and Delegate`,
        status:
          activeStepIndex === 2 &&
          hasClaimedAirdrop(merkleInfo, claimableBalance)
            ? "complete"
            : activeStepIndex === 2
            ? "current"
            : "upcoming",
        content: <DelegateStepCard signer={signer} account={account} />,
      },
    ];
  }, [account, active, activeStepIndex, claimableBalance, merkleInfo, signer]);

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
        <Steps steps={steps} activeStepIndex={activeStepIndex} />
      </div>

      <div className={tw(width("w-full", "md:w-3/5"), height("h-full"))}>
        {steps[activeStepIndex || 0].content}
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
