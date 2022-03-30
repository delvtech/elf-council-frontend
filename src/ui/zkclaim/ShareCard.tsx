import React, { ReactElement } from "react";
import { InlineElfiLabel } from "./InlineElfiLabel";
import CallToActionCard from "./CallToActionCard";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import ElementUrl from "src/elf/urls";
import TwitterIcon from "src/ui/base/svg/TwitterIcon";
import DiscordIcon from "src/ui/base/svg/DiscordIcon";
import CommonwealthIcon from "src/ui/base/svg/CommonwealthIcon";
import Link from "next/link";
import { t, jt } from "ttag";
import ElementIcon from "src/ui/base/svg/ElementIcon/ElementIcon";

interface ShareCardProps {
  className?: string;
}

export default function ShareCard({ className }: ShareCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col justify-center p-2 text-white sm:items-center sm:px-6 sm:py-4 sm:text-center">
        <h1 className="mb-5 text-3xl font-semibold">{t`Delegation Successful!`}</h1>
        <p className="mb-10 font-bold">{jt`Congratulations on delegating your ${InlineElfiLabel}.`}</p>
        <Link href="/" passHref>
          <CallToActionCard
            as="a"
            className="mb-10 md:w-2/3"
            label={t`Back to Overview`}
            icon={<ElementIcon className="h-8 w-8" />}
          />
        </Link>
        <p className="mb-4 text-left md:w-2/3">{t`Share your airdrop experience on Twitter and join the Element Discord to get more involved in the community and governance system.`}</p>
        <div className="flex w-full gap-4 text-center">
          <CallToActionCard
            as="a"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              t`🧝‍♂️`,
            )}`}
            target="_blank"
            rel="noreferrer"
            label={t`Tweet @element_fi`}
            icon={<TwitterIcon />}
          />
          <CallToActionCard
            as="a"
            href={ElementUrl.DISCORD}
            target="_blank"
            rel="noreferrer"
            label={t`Join Discord`}
            icon={<DiscordIcon />}
          />
          <CallToActionCard
            as="a"
            href={ElementUrl.FORUM}
            target="_blank"
            rel="noreferrer"
            label={t`Visit forum`}
            icon={<CommonwealthIcon />}
          />
        </div>
      </div>
    </Card>
  );
}
