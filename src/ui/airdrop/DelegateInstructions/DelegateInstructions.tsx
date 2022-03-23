import React, { ReactElement } from "react";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import H1 from "src/ui/base/H1/H1";
import { jt, t } from "ttag";

interface DelegateInstructionsProps {
  account: string | null | undefined;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const elementIcon = (
  <ElementIconCircle key="element-icon" inline size={IconSize.SMALL} />
);
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
      <div className="flex h-full w-full flex-col items-center justify-center space-y-8">
        <H1>{t`What is delegation?`}</H1>
        <div
          className={"mb-8 w-2/3"}
        >{jt`As a participant in Element DAO, you can use your
        ${elementIcon}ELFI voting power yourself (i.e., self-delegate),
        or you can delegate it to another member to represent you and your
        vision. You can only delegate it to one user, but you can change your
        selection at any time.`}</div>
      </div>
    </StepCard>
  );
}
