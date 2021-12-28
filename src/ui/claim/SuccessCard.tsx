import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import classNames from "classnames";
import H2 from "src/ui/base/H2";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";

interface SuccessCardProps {
  className?: string;
}

// PLACEHOLDER
const ElfiTokenAmount = "208.9291341";

export default function SuccessCard({
  className,
}: SuccessCardProps): ReactElement {
  const ElfiTokenAmountParts = ElfiTokenAmount.split(".");
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="text-white pt-2 sm:pt-6 px-8 sm:px-16 md:px-60 pb-4 sm:pb-14 sm:text-center flex justify-center sm:items-center flex-col gap-2">
        <h1 className="text-3xl font-semibold mb-5">{t`Congratulations`}</h1>
        <H2 className="text-votingGreen text-2xl mb-9">{t`You're eligible for this Airdrop`}</H2>
        <div
          className={classNames(
            "bg-white rounded-lg flex flex-col items-center justify-center pt-16 px-10 pb-14 mb-6 min-w-full",
            // eslint-disable-next-line tailwindcss/no-custom-classname
            classNames("shadow-[0_0_52px_rgba(143,216,231,.7)]"),
          )}
        >
          <ElementIcon
            size={IconSize.LARGE}
            className="shadow-none mb-8"
            bgColorClassName="bg-paleLily"
          />
          <p className="text-3xl font-semibold text-blueGrey">
            <span className="text-principalRoyalBlue">
              {ElfiTokenAmountParts[0]}
            </span>
            .{ElfiTokenAmountParts[1]}
          </p>
          <p className="text-blueGrey">{t`$ELFI tokens`}</p>
        </div>
        <label className="mb-6 flex items-center gap-3 text-blueGrey group">
          <input
            id="add-elfi-to-metamask"
            type="checkbox"
            className={classNames(
              "rounded",
              "bg-transparent",
              "text-current",
              "border-current",
              "border-2",
              "w-4",
              "h-4",
              "box-content",
              "group:hover:border-white",
              "hover:border-white",
              "transition-all",
              "bg-center",

              "checked:border-white",
              "checked:focus:border-white",
              "checked:hover:border-white",
              "checked:text-principalRoyalBlue",
              // eslint-disable-next-line tailwindcss/no-custom-classname
              classNames("peer")
            )}
            style={{ backgroundSize: "80%" }}
          />
          <span className="peer-checked:text-white transition-all">{t`Add $ELFI to my Metamask`}</span>
        </label>
        <Button
          className="min-w-full justify-center"
          variant={ButtonVariant.GRADIENT}
        >{t`Claim my $ELFI`}</Button>
      </div>
    </Card>
  );
}
