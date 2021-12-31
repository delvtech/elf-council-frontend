import React, { ReactElement } from "react";
import { YouCanDelegateCard } from "src/ui/airdrop/DelegateInstructions/YouCanDelegateCard";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import { t } from "ttag";

interface DelegateInstructionsProps {
  account: string | null | undefined;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function DelegateInstructions({
  onNextStep,
  onPrevStep,
  account,
}: DelegateInstructionsProps): ReactElement {
  return (
    <StepCard
      onNextStep={onNextStep}
      onPrevStep={onPrevStep}
      nextStepLabel={t`Pick Delegate`}
    >
      <div className="text-left text-3xl font-bold mb-10">{t`Delegate`}</div>
      <div className="flex flex-col w-full justify-center text-base mb-10">
        <span
          className={"w-full mb-4"}
        >{t`In order to participate in governance you must select someone to
          use the voting power associated with your tokens.  To learn more about
          our governance system and delegating process read here.`}</span>
        <span className="w-full font-bold mb-2">{t`You can select anyone to delegate to, including
          yourself. You will own your tokens and you can change your delegate at
          any time.`}</span>
      </div>
      <div className="flex w-full flex-col md:flex-row space-y-10 md:space-x-10 md:space-y-0 px-12 mb-10">
        <YouCanDelegateCard account={account} />
        {/* spacer */}
        <div className="flex-1" />
      </div>
    </StepCard>
  );
}
