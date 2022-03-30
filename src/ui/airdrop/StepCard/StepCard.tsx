import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

interface StepCardProps {
  onNextStep: () => void;
  nextStepDisabled?: boolean;
  nextStepLabel?: string | ReactNode;
  prevStepLabel?: string;
  onPrevStep?: () => void;
  children?: ReactNode;
  className?: string;
}

export function StepCard({
  onNextStep,
  onPrevStep,
  nextStepDisabled,
  nextStepLabel = t`Next`,
  prevStepLabel = t`Back`,
  children,
  className,
}: StepCardProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className={classNames("flex flex-col text-white", className)}
    >
      {/* Extra div because we can't override padding set by Card */}
      <div className="flex h-full flex-col justify-between p-2">
        {children}
        <div className="flex justify-between pt-6">
          {onPrevStep && (
            <Button onClick={onPrevStep} variant={ButtonVariant.WHITE}>
              <span className="px-10">{prevStepLabel}</span>
            </Button>
          )}
          <Button
            className="ml-auto"
            disabled={nextStepDisabled}
            onClick={onNextStep}
            variant={ButtonVariant.GRADIENT}
          >
            <span className="px-10">{nextStepLabel}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
