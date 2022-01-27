import React, { ReactElement } from "react";
import { Platform } from "./types";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Image from "next/image";
import { t } from "ttag";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import classNames from "classnames";

function getLabel(platform: Platform) {
  switch (platform) {
    case Platform.DISCORD:
      return t`Discord Public ID`;
    case Platform.GITHUB:
      return t`GitHub Public ID`;
    default:
      return t`Public ID`;
  }
}

interface SuccessCardProps {
  className?: string;
  publicId: string;
  platform: Platform;
}

export default function SuccessCard({
  className,
  publicId,
  platform,
}: SuccessCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col items-center justify-center gap-2 px-4 pt-3 pb-4 text-center text-white md:pt-8 md:px-14 md:pb-14">
        <div
          className={classNames(
            "bg-opacity-10",
            "bg-topaz",
            "flex",
            "h-32",
            "items-center",
            "justify-center",
            "mb-5",
            "relative",
            "rounded-full",
            "w-32",

            "before:absolute",
            "before:bg-topaz",
            "before:h-24",
            "before:opacity-50",
            "before:rounded-full",
            "before:w-24",

            "after:absolute",
            "after:bg-topaz",
            "after:h-16",
            "after:rounded-full",
            "after:w-16",
          )}
        >
          <ShieldExclamationIcon className="relative z-10 h-10" />
        </div>
        <div className="flex flex-col items-stretch">
          <h1 className="mb-4 text-3xl font-semibold">{t`Public ID Succesfully created`}</h1>
          <p className="w-0 min-w-full">
            {platform === Platform.DISCORD && (
              <>
                {t`Send your new Public ID in our `}
                <a
                  href="https://element.fi/discord"
                  target="_blank"
                  rel="noreferrer"
                  className="text-yieldLightBlue"
                >{t`Discord channel`}</a>
                {t` to associate it with your Discord username.`}
              </>
            )}
            {platform === Platform.GITHUB && (
              <>
                {t`Share your new Public ID in a comment on our `}
                <a
                  href="https://github.com/element-fi/elf-council-frontend/issues/382"
                  target="_blank"
                  rel="noreferrer"
                  className="text-yieldLightBlue"
                >{t`GitHub issue`}</a>
                {t` to associate it with your GitHub username.`}
              </>
            )}
          </p>
        </div>
        <HashString
          label={getLabel(platform)}
          className="mb-10"
          showCopyButton={true}
          inputProps={{
            value: publicId,
            placeholder: "0x".padEnd(42, "0"),
            readOnly: true,
          }}
        />
        <div className="flex gap-12">
          {platform === Platform.DISCORD && (
            <AnchorButton
              variant={ButtonVariant.GRADIENT}
              href="https://element.fi/discord"
              className="flex gap-2"
            >
              {t`Go to Discord`}
              <Image
                width={24}
                height={24}
                src="/assets/discordlogo--light.svg"
                alt=""
              />
            </AnchorButton>
          )}
          {platform === Platform.GITHUB && (
            <AnchorButton
              variant={ButtonVariant.GRADIENT}
              href="https://github.com/element-fi/elf-council-frontend/issues/382"
              className="flex gap-2"
            >
              {t`Go to GitHub`}
              <Image
                width={24}
                height={24}
                src="/assets/githublogo--light.svg"
                alt=""
              />
            </AnchorButton>
          )}
        </div>
      </div>
    </Card>
  );
}
