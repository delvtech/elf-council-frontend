import React, { ReactElement } from "react";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import H1 from "src/ui/base/H1/H1";
import { jt, t } from "ttag";

interface DelegateInstructionsProps {
  account: string | null | undefined;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const elementIconInBodyText = (
  <ElementIcon
    key="element-icon-in-body-text"
    className="ml-0.5 mr-1 -mb-1.5 inline-block bg-paleLily"
    size={IconSize.MEDIUM}
  />
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
        <p
          className={"mb-8 w-2/3"}
        >{jt`As a participant in Element DAO, you can use your
        ${elementIconInBodyText}ELFI voting power yourself (i.e., self-delegate),
        or you can delegate it to another member to represent you and your
        vision. You can only delegate it to one user, but you can change your
        selection at any time.`}</p>
      </div>
    </StepCard>
  );
}
