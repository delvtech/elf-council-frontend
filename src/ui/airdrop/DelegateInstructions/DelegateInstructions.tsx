import React, { ReactElement } from "react";
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
}: DelegateInstructionsProps): ReactElement {
  return (
    <StepCard
      onNextStep={onNextStep}
      onPrevStep={onPrevStep}
      className="md:h-[624px]"
      nextStepLabel={t`Pick Delegate`}
    >
      <div className="flex items-center justify-center mb-8 text-3xl font-bold">
        {t`What is delegation?`}
      </div>
      <div className="flex flex-col items-center justify-center w-full mb-10 text-base text-justify">
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
