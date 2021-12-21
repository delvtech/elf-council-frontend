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
} from "src/elf-tailwindcss-classnames";
import { DelegateStepCard } from "src/ui/airdrop/AirdropPage/DelegateStepCard";
import { ViewAirdropStepCard } from "src/ui/airdrop/AirdropPage/ViewAirdropStepCard";
import { Step } from "src/ui/base/Card/Steps/Steps";
import Steps2 from "src/ui/base/Card/Steps2/Steps2";
import { useSigner } from "src/ui/signer/useSigner";
import { t } from "ttag";
import { ConnectWalletStepCard } from "./ConnectWalletStepCard";

interface StepWithContent extends Step {
  content: ReactNode;
}

export default function AirdropPage(): ReactElement {
  const { account, active, library } = useWeb3React();
  const signer = useSigner(account, library);

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: StepWithContent[] = useMemo(() => {
    return [
      {
        name: t`Connect wallet`,
        status: account ? "complete" : "current",
        onClick: () => {
          setActiveStepIndex(0);
        },
        content: (
          <ConnectWalletStepCard
            account={account}
            walletConnectionActive={active}
            onNextStep={() => setActiveStepIndex(1)}
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
        onClick: () => {
          if (account) {
            setActiveStepIndex(1);
          }
        },
        content: (
          <ViewAirdropStepCard
            account={account}
            onNextStep={() => setActiveStepIndex(2)}
          />
        ),
      },
      {
        name: t`Claim and Delegate`,
        status: activeStepIndex === 2 ? "current" : "upcoming",
        onClick: () => {
          if (account) {
            setActiveStepIndex(2);
          }
        },
        content: <DelegateStepCard signer={signer} account={account} />,
      },
    ];
  }, [account, active, activeStepIndex, signer]);

  return (
    <div
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        height("h-full"),
        space("space-y-8"),
        width("w-full"),
        justifyContent("justify-center"),
        alignItems("items-center"),
        margin("mt-12"),
      )}
    >
      <div style={{ width: 600 }}>
        <Steps2 steps={steps} activeStepIndex={activeStepIndex} />
      </div>

      <div className={tw(width("w-full", "md:w-3/5"))}>
        {steps[activeStepIndex].content}
      </div>
    </div>
  );
}
