import React, { ElementType, ReactElement, ReactNode } from "react";
import Card, { CardProps, CardVariant } from "src/ui/base/Card/Card";
import { PolymorphicComponentProps } from "src/@types/helper";
import classNames from "classnames";

interface CallToActionCardProps extends Omit<CardProps, "children"> {
  label: ReactNode;
  icon: ReactNode;
}

type PolymorphicCallToActionProps<C extends ElementType> =
  PolymorphicComponentProps<C, CallToActionCardProps>;

export default function CallToActionCard<C extends ElementType>({
  label,
  icon,
  className,
  ...cardProps
}: PolymorphicCallToActionProps<C>): ReactElement {
  return (
    <Card
      interactive
      variant={CardVariant.HACKER_SKY}
      className={classNames(
        "flex h-full w-full flex-col items-center",
        className,
      )}
      {...cardProps}
    >
      <span className="mb-2 text-lg font-bold text-principalRoyalBlue">
        {label}
      </span>
      <span>{icon}</span>
    </Card>
  );
}
