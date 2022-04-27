import { CheckCircleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";
import { jt, t } from "ttag";

const elementIconInBodyText = (
  <ElementIconCircle
    key="element-icon-in-body-text"
    className="ml-0.5 mr-1 inline-block bg-paleLily"
    inline
    size={IconSize.MEDIUM}
  />
);
export function NoAirdropCard(): ReactElement {
  return (
    <Card variant={CardVariant.BLUE} className="text-white">
      <div className="flex flex-col">
        <div className="mb-4 text-right md:mb-0">
          <Tag intent={Intent.WARNING}>
            <span className="font-bold">{t`Not eligible for airdrop`}</span>
            <CheckCircleIcon height={24} className="ml-4" />
          </Tag>
        </div>
        <div className="mb-2 flex items-center justify-center text-3xl font-bold">
          <span className="text-center">{t`No airdrop found`}</span>
        </div>
        <div className="mb-10 flex w-full flex-col items-center justify-center text-center text-base">
          <span className="mb-6 w-full font-bold ">{jt`This wallet has no ${elementIconInBodyText}ELFI available to delegate.`}</span>
        </div>
        <div className="mb-16 flex flex-col justify-center space-y-10 px-12 md:flex-row md:space-x-10 md:space-y-0">
          <Card
            variant={CardVariant.HACKER_SKY}
            className="h-64 w-72 text-center shadow-[0_0_52px_rgba(143,216,231,.7)] md:w-96"
          >
            <div className="flex h-full w-full flex-col items-center justify-center p-6">
              <div className="mb-3 text-lg font-bold text-principalRoyalBlue text-opacity-60">{t`Airdrop amount`}</div>
              <div className="flex justify-center gap-2 text-center text-5xl font-bold text-principalRoyalBlue">
                <ElementIconCircle
                  className="mr-2 bg-paleLily"
                  size={IconSize.LARGE}
                />
                <span>0</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}
