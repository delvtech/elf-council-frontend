import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { t } from "ttag";

interface ViewAirdropStepCardProps {
  onNextStep: () => void;
}

export function ViewAirdropStepCard({
  onNextStep,
}: ViewAirdropStepCardProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw("flex", "flex-col", "text-white", "text-center")}
    >
      <div className={tw("text-center", "text-sm", "mb-4")}>
        <div
          className={tw("font-semibold", "tracking-wider")}
        >{t`Congratulations!`}</div>
        <p className={tw("text-center")}>
          {t`You have some ELFI available to claim.`}
        </p>
      </div>
      <div
        className={tw("text-2xl", "font-bold", "text-white", "mb-6")}
      >{t`50 ELFI`}</div>
      <div className={tw("text-sm", "text-justify", "mb-6")}>
        <p>{t`In order to participate in governance you must select someone to
        use the voting power associated with your tokens.  You can select
        anyone, including yourself.  You will still own your tokens and you can
        change your delegate at any time.`}</p>
      </div>
      <div className={tw("flex", "justify-end", "w-full")}>
        <Button
          onClick={onNextStep}
          variant={ButtonVariant.OUTLINE_WHITE}
        >{t`Pick a delegate`}</Button>
      </div>
    </Card>
  );
}
