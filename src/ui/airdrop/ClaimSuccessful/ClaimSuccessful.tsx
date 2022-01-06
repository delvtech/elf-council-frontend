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
  <ElementIcon key="element-icon" className="mx-2" size={IconSize.MEDIUM} />
);
export function ClaimSuccessful(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex flex-col text-white text-center h-full"
    >
      <div className="flex flex-col p-6 justify-center items-center">
        <h2 className="text-3xl font-bold my-6">{t`Claim Successful!`}</h2>
        <div className="flex flex-col w-full items-center text-base space-y-3 mb-10">
          <div className={"w-full md:w-1/2"}>
            <p className="flex justify-center">{jt`Congratulations on claiming your ${elfiLogoElement} $ELFI tokens.`}</p>
          </div>
          <p className="w-full md:w-1/2">{t`Share your airdrop experience on Twitter and join the Element discord 
	  to get more involved in our community and governance system.`}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-5/6 mb-10">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              t`I just claimed my $ELFI airdrop!`,
            )}`}
          >
            <CallToActionCard
              label={t`Tweet @element_fi`}
              icon={<TwitterIconFromFigma />}
            />
          </a>
          <a target="_blank" rel="noreferrer" href="https://element.fi/discord">
            <CallToActionCard
              label={t`Join #ELFArmy Discord`}
              icon={<DiscordIconFromFigma />}
            />
          </a>
          <a href="https://forum.element.fi">
            <CallToActionCard
              label={t`Join the discussion`}
              icon={<CommonwealthIcon />}
            />
          </a>
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <CallToActionCard
                label={t`Launch dashboard`}
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
        </div>
        <div className="flex w-full justify-center text-base">
          <p className="w-full md:w-1/2">{t`To change your delegation, you can visit our delegate dashboard live in our main governance system.`}</p>
        </div>
      </div>
    </Card>
  );
}
