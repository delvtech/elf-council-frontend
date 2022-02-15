import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { jt, t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";

const elfiAmount = (
  <span className="whitespace-nowrap">
    <ElementIcon
      key="element-icon-in-body-text"
      className="ml-0.5 mr-1 -mb-1.5 inline-block bg-paleLily"
      size={IconSize.MEDIUM}
    />
    {t`ELFI`}
  </span>
);

interface DelegateInfoCardProps {
  className?: string;
  onBackClick?: () => void;
  onPickDelegateClick?: () => void;
}

export default function DelegateInfoCard({
  className,
  onBackClick,
  onPickDelegateClick,
}: DelegateInfoCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="p-2 text-white sm:px-6 sm:py-4">
        <div className="flex flex-col justify-center text-white sm:items-center sm:px-20 md:my-12">
          <h1 className="mb-5 text-3xl font-semibold">{t`What is Delegation?`}</h1>
          <p
            className={"mb-8 max-w-lg"}
          >{jt`As a participant in Element DAO, you can use your
          ${elfiAmount} voting power yourself (i.e., self-delegate),
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
          {onPickDelegateClick && (
            <Button
              className="px-12"
              variant={ButtonVariant.GRADIENT}
              onClick={onPickDelegateClick}
            >
              {t`Pick Delegate`}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
