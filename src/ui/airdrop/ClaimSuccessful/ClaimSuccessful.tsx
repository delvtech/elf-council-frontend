import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { jt, t } from "ttag";
import { TwitterIconFromFigma } from "src/ui/base/TwitterIconFromFigma";
import Image from "next/image";
import { CallToActionCard } from "./CallToActionCard";
import { DiscordIconFromFigma } from "src/ui/base/DiscordIconFromFigma";
import { CommonwealthIcon } from "src/ui/base/CommonwealthIcon";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
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
      className="flex flex-col h-full text-center text-white"
    >
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="mb-6 text-3xl font-bold">{t`Deposit Successful!`}</h2>
        <div className="flex flex-col items-center w-full mb-10 space-y-3 text-base">
          <p className="flex justify-center font-bold">{jt`Congratulations on depositing your ${elfiLogoElement} $ELFI tokens.`}</p>
        </div>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="w-2/3 mb-10">
            <CallToActionCard
              label={t`Visit Element Council Governance`}
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
        <p className="w-full mb-4 text-justify md:w-2/3">{t`Share your airdrop experience on Twitter and join the Element discord 
	  to get more involved in our community and governance system.`}</p>
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
            href="https://element.fi/discord"
            className="flex-1"
          >
            <CallToActionCard
              label={t`Join #ELFArmy Discord`}
              icon={<DiscordIconFromFigma />}
            />
          </a>
          <a href="https://forum.element.fi" className="flex-1">
            <CallToActionCard
              label={t`Join the discussion`}
              icon={<CommonwealthIcon />}
            />
          </a>
        </div>
      </div>
    </Card>
  );
}
