import React, { ReactElement } from "react";
import { width } from "src/elf-tailwindcss-classnames";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { TwitterIconFromFigma } from "src/ui/base/TwitterIconFromFigma";
import Image from "next/image";
import { CTACard } from "./CTACard";
import { DiscordIconFromFigma } from "src/ui/base/DiscordIconFromFigma";
import { CommonwealthIcon } from "src/ui/base/CommonwealthIcon";

interface ClaimSuccessfulProps {}

export function ClaimSuccessful({}: ClaimSuccessfulProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex flex-col text-white text-center h-full"
    >
      <div className="flex flex-col p-6">
        <div className="text-3xl font-bold my-6">{t`Claim Successful!`}</div>
        <div className="flex flex-col w-full items-center justify-center text-base space-y-4 mb-10">
          <span
            className={width("w-full", "md:w-1/2")}
          >{t`Congratulations on claiming your $ELFI tokens.`}</span>
          <span
            className={width("w-full", "md:w-1/2")}
          >{t`Share your airdrop experience on Twitter and join the Element discord 
	  to get more involved in our community and governance system.`}</span>
        </div>
        <div className="flex flex-col md:flex-row w-full space-y-10 md:space-x-10 md:space-y-0 px-12 mb-10">
          <CTACard
            label={t`Tweet @element_fi`}
            icon={<TwitterIconFromFigma />}
          />
          <CTACard
            label={t`Join #ELFArmy Discord`}
            icon={<DiscordIconFromFigma />}
          />
        </div>
        <div className="flex flex-col md:flex-row w-full space-y-10 md:space-x-10 md:space-y-0 px-12 mb-10">
          <CTACard label={t`Join the discussion`} icon={<CommonwealthIcon />} />
          <CTACard
            label={t`Launch dashboard`}
            icon={
              <Image
                height="26px"
                width="26px"
                src="/assets/CouncilLogo.svg"
                alt={t`Element Council logo`}
              />
            }
          />
        </div>
        <div className="flex w-full justify-center text-base">
          <span
            className={width("w-full", "md:w-1/2")}
          >{t`To change your delegation, you can visit our delegate dashboard live in our main governance system.`}</span>
        </div>
      </div>
    </Card>
  );
}
