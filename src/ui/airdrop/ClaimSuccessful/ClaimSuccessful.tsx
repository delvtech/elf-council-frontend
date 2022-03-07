import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { jt, t } from "ttag";
import { TwitterIconFromFigma } from "src/ui/base/TwitterIconFromFigma";
import Image from "next/image";
import { CallToActionCard } from "./CallToActionCard";
import { DiscordIconFromFigma } from "src/ui/base/DiscordIconFromFigma";
import { CommonwealthIcon } from "src/ui/base/CommonwealthIcon";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import urls from "src/elf/urls";
import Link from "next/link";

const elfiLogoElement = (
  <ElementIcon
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
              icon={
                <Image
                  height="24px"
                  width="24px"
                  src="/assets/CouncilLogo.svg"
                  alt={t`Element Council logo`}
                />
              }
            />
          </a>
        </Link>
        <p className="mb-4 w-full text-justify md:w-2/3">{t`Share your airdrop
        experience on Twitter and join the Element Discord to get more involved
        in our community and governance system.`}</p>
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
              icon={<TwitterIconFromFigma />}
            />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={urls.discord}
            className="flex-1"
          >
            <CallToActionCard
              label={t`Join Discord`}
              icon={<DiscordIconFromFigma />}
            />
          </a>
          <a href={urls.forum} className="flex-1">
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
