import React, { ReactElement, ReactNode } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

interface StepCardProps {
  onNextStep: () => void;
  nextStepLabel?: string;
  prevStepLabel?: string;
  onPrevStep: () => void;
  children?: ReactNode;
}

export function StepCard({
  onNextStep,
  onPrevStep,
  nextStepLabel = t`Next`,
  prevStepLabel = t`Back`,
  children,
}: StepCardProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex flex-col text-white h-full"
    >
      {/* Extra div because we can't override padding set by Card */}
      <div className="p-6">
        {children}
        <div className="flex pt-6 justify-between">
          <Button onClick={onPrevStep} variant={ButtonVariant.WHITE}>
            <span className="px-10">{prevStepLabel}</span>
          </Button>
          <Button onClick={onNextStep} variant={ButtonVariant.GRADIENT}>
            <span className="px-10">{nextStepLabel}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
