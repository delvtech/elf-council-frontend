import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { jt, t } from "ttag";
import { CallToActionCard } from "./CallToActionCard";
import TwitterIcon from "src/ui/base/svg/TwitterIcon";
import DiscordIcon from "src/ui/base/svg/DiscordIcon";
import CommonwealthIcon from "src/ui/base/svg/CommonwealthIcon";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import ElementUrl from "src/elf/urls";
import Link from "next/link";
import ElementIcon from "src/ui/base/svg/ElementIcon/ElementIcon";

const elfiLogoElement = (
  <ElementIconCircle
    key="element-icon"
    className="mx-1 md:mx-2"
    size={IconSize.MEDIUM}
  />
);
export function ClaimSuccessful(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex h-full flex-col text-center text-white"
    >
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="mb-6 text-3xl font-bold">{t`Delegation Successful!`}</h2>
        <div className="mb-10 flex w-full flex-col items-center space-y-3 text-base">
          <p className="flex justify-center font-bold">{jt`Congratulations on
          delegating your ${elfiLogoElement} ELFI.`}</p>
        </div>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="mb-10 w-2/3">
            <CallToActionCard
              label={t`Back to Overview`}
              icon={<ElementIcon className="h-8 w-8" />}
            />
          </a>
        </Link>
        <p className="mb-4 w-full text-justify md:w-2/3">{t`Share your airdrop 
        experience on Twitter and join the Element Discord to get more involved 
        in the community and governance system.`}</p>
        <div className="flex w-full space-x-4">
          <a
            target="_blank"
            rel="noreferrer"
            className="flex-1"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              t`🧝‍♂️`,
            )}`}
          >
            <CallToActionCard
              label={t`Tweet @element_fi`}
              icon={<TwitterIcon />}
            />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={ElementUrl.DISCORD}
            className="flex-1"
          >
            <CallToActionCard label={t`Join Discord`} icon={<DiscordIcon />} />
          </a>
          <a href={ElementUrl.FORUM} className="flex-1">
            <CallToActionCard
              label={t`Visit forum`}
              icon={<CommonwealthIcon />}
            />
          </a>
        </div>
      </div>
    </Card>
  );
}
