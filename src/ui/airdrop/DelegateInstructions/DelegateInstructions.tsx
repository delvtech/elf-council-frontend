import React, { ReactElement } from "react";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import H1 from "src/ui/base/H1/H1";
import { t } from "ttag";

interface DelegateInstructionsProps {
  account: string | null | undefined;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function DelegateInstructions({
  onNextStep,
  onPrevStep,
}: DelegateInstructionsProps): ReactElement {
  return (
    <StepCard
      onNextStep={onNextStep}
      onPrevStep={onPrevStep}
      className="md:h-[624px]"
      nextStepLabel={t`Pick Delegate`}
    >
      <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
        <H1>{t`What is delegation?`}</H1>
        <p
          className={"w-2/3 mb-8"}
        >{t`In order to participate in governance you must select someone to
          use the voting power associated with your tokens.  To learn more about
          our governance system and delegating process read here.`}</p>
        <p className="w-2/3 mb-2 font-bold">{t`You can select anyone to delegate to, including
          yourself. You will own your tokens and you can change your delegate at
          any time.`}</p>
      </div>
    </StepCard>
  );
}
