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
        <H1>{t`Vote or delegate?`}</H1>
        <p
          className={"w-2/3 mb-8"}
        >{t`As an $ELFI depositor you can use your voting power to participate
        in governance, or you can delegate it to another member to represent you
        and your vision. You can change your selection at any time.`}</p>
        <p className="w-2/3 mb-2 font-bold">{t`In all cases you maintain
        ownership of your tokens, which will remain in the Voting Vault.`}</p>
      </div>
    </StepCard>
  );
}
