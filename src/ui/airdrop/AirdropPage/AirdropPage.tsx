import { useWeb3React } from "@web3-react/core";
import React, { ReactElement, ReactNode, useMemo, useState } from "react";
import tw from "src/elf-tailwindcss-classnames";
import { DelegateStepCard } from "src/ui/airdrop/AirdropPage/DelegateStepCard";
import { ViewAirdropStepCard } from "src/ui/airdrop/AirdropPage/ViewAirdropStepCard";
import Card from "src/ui/base/Card/Card";
import Steps, { Step } from "src/ui/base/Card/Steps/Steps";
import H1 from "src/ui/base/H1";
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
        name: t`View airdrop`,
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
        name: t`Delegate and claim tokens`,
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
    <div className={tw("flex", "flex-col", "h-full", "pt-8", "space-y-8")}>
      <H1
        className={tw("flex-1", "text-center")}
      >{t`Element Finance Token Airdrop`}</H1>
      <div className={tw("flex", "space-x-12", "h-full")}>
        <div>
          <Card
            className={tw("flex", "flex-col", "text-white", "w-80", "h-64")}
          >
            <div
              className={tw(
                "font-bold",
                "text-principalRoyalBlue",
                "text-center",
                "mb-6"
              )}
            >{t`Claim your ELFI in 3 steps`}</div>
            <Steps steps={steps} />
          </Card>
        </div>

        <div style={{ width: 500 }}>{steps[activeStepIndex].content}</div>
      </div>
    </div>
  );
}
