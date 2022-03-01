import React, { ReactElement } from "react";
import { InlineElfiLabel } from "./InlineElfiLabel";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { jt, t } from "ttag";

interface DelegateInfoCardProps {
  className?: string;
  onBackClick?: () => void;
  onNextClick?: () => void;
}

export default function DelegateInfoCard({
  className,
  onBackClick,
  onNextClick,
}: DelegateInfoCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="p-2 text-white sm:px-6 sm:py-4">
        <div className="flex flex-col justify-center text-white sm:items-center sm:px-20 md:my-12">
          <h1 className="mb-5 text-3xl font-semibold">{t`What is Delegation?`}</h1>
          <p
            className={"mb-8 max-w-lg"}
          >{jt`As a participant in Element DAO, you can use your
          ${InlineElfiLabel} voting power yourself (i.e., self-delegate),
          or you can delegate it to another member to represent you and your
          vision. You can only delegate it to one user, but you can change your
          selection at any time.`}</p>
        </div>
        <div className="flex justify-between">
          {onBackClick && (
            <Button
              className="px-12"
              variant={ButtonVariant.WHITE}
              onClick={onBackClick}
            >
              {t`Back`}
            </Button>
          )}
          {onNextClick && (
            <Button
              className="px-12"
              variant={ButtonVariant.GRADIENT}
              onClick={onNextClick}
            >
              {t`Pick Delegate`}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
