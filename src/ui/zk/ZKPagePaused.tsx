import React, { ReactElement } from "react";
import { Platform } from "./types";
import { jt, t } from "ttag";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import H3 from "src/ui/base/H3/H3";
import RadiantShieldIcon from "./RadiantShieldIcon";
import ElementUrl from "src/elf/urls";

interface ZKPageProps {
  platform: Platform;
}

const twitterLink = (
  <a
    key="discordLink"
    href={ElementUrl.TWITTER}
    target="_blank"
    rel="noreferrer"
    className="text-yieldLightBlue"
  >
    {t`Twitter`}
  </a>
);

const discordLink = (
  <a
    key="discordLink"
    href={ElementUrl.DISCORD}
    target="_blank"
    rel="noreferrer"
    className="text-yieldLightBlue"
  >
    {t`Element Discord server`}
  </a>
);

export default function ZKPage({ platform }: ZKPageProps): ReactElement {
  let platformName = "";
  switch (platform) {
    case Platform.DISCORD:
      platformName = "Discord";
      break;
    case Platform.GITHUB:
      platformName = "GitHub";
      break;
  }
  return (
    <div className="flex w-full max-w-4xl flex-1 flex-col items-center gap-12 sm:mt-20">
      <Card variant={CardVariant.BLUE}>
        <div className="flex flex-col items-center justify-center gap-2 px-6 pt-3 pb-10 text-center text-white sm:px-20 sm:pt-8 sm:pb-20">
          {/* <div className="p-2 text-white sm:px-6 sm:py-4"> */}
          <RadiantShieldIcon className="mb-5" />
          <h1 className="mb-4 text-4xl font-semibold text-white">{t`Preparing ${platformName} Airdrop`}</h1>
          <p>{jt`The first round of ${platformName} airdrop claims has concluded. Follow us on ${twitterLink} and join the ${discordLink} to be notified when the next round starts.`}</p>
        </div>
      </Card>
    </div>
  );
}
