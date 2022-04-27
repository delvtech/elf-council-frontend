import { ReactElement } from "react";
import RadiantShieldIcon from "./RadiantShieldIcon";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import DiscordIcon from "src/ui/base/svg/DiscordIcon";
import { t, jt } from "ttag";
import classNames from "classnames";

const discordClaimChannelUrl =
  "https://discord.com/channels/754739461707006013/958484548558143518";

const discordChannelLink = (
  <a
    key="discordChannelLink"
    href={discordClaimChannelUrl}
    target="_blank"
    rel="noreferrer"
    className="text-yieldLightBlue"
  >
    {t`#discord-claim channel`}
  </a>
);

interface DiscordShareCardProps {
  className?: string;
  publicId: string;
  onShareClick?: () => void;
}

export default function DiscordShareCard({
  className,
  publicId,
  onShareClick,
}: DiscordShareCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col items-center justify-center gap-2 px-4 pt-3 pb-4 text-center text-white md:px-14 md:pt-8 md:pb-14">
        <RadiantShieldIcon className="mb-5" />
        <div className="flex flex-col items-stretch">
          <h1 className="mb-4 text-3xl font-semibold">{t`Public ID Successfully Created`}</h1>
          <p className="w-0 min-w-full">{jt`Copy the command below into the ${discordChannelLink} of the Element Discord server to associate your new Public ID with your Discord ID. You'll see a confirmation message from the Public ID Collection Bot after it's submitted.`}</p>
        </div>

        <HashString
          label={t`Discord Command`}
          className="mb-10"
          showCopyButton
          inputProps={{
            className: classNames(
              "bg-white/10 !border-white/20 !text-white !tracking-normal !font-normal",
            ),
            value: t`/submitpublicid public-id:${publicId}`,
            readOnly: true,
          }}
        />
        <div className="flex gap-12">
          <AnchorButton
            onClick={onShareClick}
            variant={ButtonVariant.GRADIENT}
            href={discordClaimChannelUrl}
            className="flex gap-2"
            target="_blank"
          >
            {t`Go to Discord`}
            <DiscordIcon width={24} height={24} className="fill-white" />
          </AnchorButton>
        </div>
      </div>
    </Card>
  );
}
