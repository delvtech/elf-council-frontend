import { CheckCircleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";
import { jt, t } from "ttag";

const elementIconInBodyText = (
  <ElementIcon
    key="element-icon-in-body-text"
    className="bg-paleLily inline-block ml-0.5 mr-1 -mb-1.5"
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
        <div className="flex items-center justify-center mb-2 text-3xl font-bold">
          <span className="text-center">{t`No airdrop found`}</span>
        </div>
        <div className="flex flex-col items-center justify-center w-full mb-10 text-base text-center">
          <span className="w-full mb-6 font-bold ">{jt`This wallet has no ${elementIconInBodyText}ELFI available to delegate.`}</span>
        </div>
        <div className="flex flex-col justify-center px-12 mb-16 space-y-10 md:flex-row md:space-x-10 md:space-y-0">
          <Card
            variant={CardVariant.HACKER_SKY}
            className="h-64 w-72 md:w-96 text-center shadow-[0_0_52px_rgba(143,216,231,.7)]"
          >
            <div className="flex flex-col items-center justify-center w-full h-full p-6">
              <div className="mb-3 text-lg font-bold text-principalRoyalBlue text-opacity-60">{t`Airdrop amount`}</div>
              <div className="flex justify-center gap-2 text-5xl font-bold text-center text-principalRoyalBlue">
                <ElementIcon
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
